import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── COPILOT TOKEN CACHE ──────────────────────────────────────────────────────
// Try to exchange the GitHub OAuth token for a short-lived Copilot token.
// If the exchange endpoint is unavailable (404 = no copilot scope), fall back
// to using the OAuth token directly.
const copilotTokenCache = new Map(); // githubToken → { token, expiresAt }

async function getCopilotToken(githubToken) {
  const cached = copilotTokenCache.get(githubToken);
  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.token;
  }

  const res = await fetch('https://api.github.com/copilot_internal/v2/token', {
    headers: {
      Authorization: `token ${githubToken}`,
      'User-Agent': 'CopilotSearch/1.0',
      Accept: 'application/json',
    },
  });

  if (res.status === 404 || res.status === 401) {
    // Exchange not available — use the OAuth token directly and cache for 25 min
    console.log(`  ℹ️  Token exchange unavailable (${res.status}), using token directly`);
    copilotTokenCache.set(githubToken, { token: githubToken, expiresAt: Date.now() + 25 * 60_000 });
    return githubToken;
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  const expiresAt = new Date(data.expires_at).getTime();
  copilotTokenCache.set(githubToken, { token: data.token, expiresAt });
  return data.token;
}

// ─── ENDPOINTS ───────────────────────────────────────────────────────────────

app.get('/api/config', (_req, res) => {
  res.json({ hasToken: !!process.env.GITHUB_TOKEN });
});

app.post('/api/verify-token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ valid: false, error: 'Token not provided' });

  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'CopilotSearch/1.0',
        Accept: 'application/vnd.github+json',
      },
    });

    if (response.ok) {
      const user = await response.json();
      res.json({ valid: true, login: user.login, avatar: user.avatar_url });
    } else {
      res.json({ valid: false, error: 'Token inválido ou sem permissões' });
    }
  } catch (err) {
    res.status(500).json({ valid: false, error: err.message });
  }
});

app.get('/api/models', async (req, res) => {
  const githubToken = resolveToken(req);
  if (!githubToken) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const copilotToken = await getCopilotToken(githubToken);
    const response = await fetch('https://api.githubcopilot.com/models', {
      headers: buildCopilotHeaders(copilotToken),
    });

    if (response.ok) {
      const data = await response.json();
      const models = (data.data ?? data).filter(m => m.capabilities?.type === 'chat' || m.id);
      console.log('  ✅ Modelos disponíveis:', models.map(m => m.id).join(', '));
      res.json({ data: models });
    } else {
      console.log('  ⚠️  Falha ao buscar modelos:', response.status);
      res.json({ data: defaultModels() });
    }
  } catch (err) {
    console.log('  ⚠️  Erro ao buscar modelos:', err.message);
    res.json({ data: defaultModels() });
  }
});

app.post('/api/chat', async (req, res) => {
  const { messages, model = 'gpt-4o' } = req.body;
  const githubToken = resolveToken(req);

  if (!githubToken) {
    return res.status(401).json({ error: 'Token GitHub não fornecido. Configure nas configurações.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const copilotToken = await getCopilotToken(githubToken);

    const copilotRes = await fetch('https://api.githubcopilot.com/chat/completions', {
      method: 'POST',
      headers: buildCopilotHeaders(copilotToken),
      body: JSON.stringify({ model, messages, stream: true, n: 1, top_p: 1, temperature: 0.1 }),
    });

    if (!copilotRes.ok) {
      const errorText = await copilotRes.text();
      let errorMsg = `Erro da API Copilot (${copilotRes.status})`;
      try {
        const j = JSON.parse(errorText);
        const raw = j.message || j.error;
        errorMsg = typeof raw === 'object' ? (raw?.message || JSON.stringify(raw)) : (raw || errorMsg);
      } catch {
        errorMsg = errorText || errorMsg;
      }
      if (copilotRes.status === 401) errorMsg = 'Token expirado ou inválido. Recarregue a página.';
      if (copilotRes.status === 403) errorMsg = 'Sem assinatura ativa do GitHub Copilot.';

      res.write(`data: ${JSON.stringify({ error: errorMsg })}\n\n`);
      return res.end();
    }

    const reader = copilotRes.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done || res.destroyed) break;
        res.write(value);
      }
    } finally {
      reader.releaseLock();
    }
    res.end();

  } catch (err) {
    if (!res.destroyed) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function resolveToken(req) {
  const fromHeader = req.headers.authorization?.replace('Bearer ', '').trim();
  return (fromHeader || process.env.GITHUB_TOKEN) ?? null;
}

function buildCopilotHeaders(copilotToken) {
  return {
    Authorization: `Bearer ${copilotToken}`,
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
    'editor-version': 'vscode/1.95.3',
    'editor-plugin-version': 'copilot-chat/0.23.2',
    'user-agent': 'GitHubCopilotChat/0.23.2',
    'openai-intent': 'conversation-panel',
  };
}

function defaultModels() {
  return [
    { id: 'gpt-4o',       name: 'GPT-4o' },
    { id: 'gpt-4o-mini',  name: 'GPT-4o mini' },
    { id: 'o1-preview',   name: 'o1 Preview' },
    { id: 'o1-mini',      name: 'o1 mini' },
  ];
}

// ─── START ────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  🤖 Copilot Search rodando em http://localhost:${PORT}\n`);
  if (!process.env.GITHUB_TOKEN) {
    console.log('  ⚠️  GITHUB_TOKEN não definido. Configure o token nas configurações da UI.\n');
  }
});
