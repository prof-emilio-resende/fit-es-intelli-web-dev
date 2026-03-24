// Exemplo 4: XHR, Polling e Long-Polling
// Demonstra os padroes de comunicacao cliente-servidor
// Execute no browser (DevTools console) ou adapte para node com node-fetch

// --- XHR CLASSICO ---
function buscarComXHR(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const dados = JSON.parse(xhr.responseText);
        callback(null, dados);
      } else {
        callback(new Error(`Erro HTTP: ${xhr.status}`), null);
      }
    }
  };
  xhr.send();
}

// --- POLLING SIMPLES ---
// Cliente pergunta ao servidor em intervalos fixos: "tem novidade?"
function iniciarPolling(url, intervaloMs, onDados) {
  console.log(`Polling iniciado: consultando a cada ${intervaloMs}ms`);

  const id = setInterval(async () => {
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      console.log("[polling] dados recebidos:", dados);
      onDados(dados);
    } catch (erro) {
      console.error("[polling] erro:", erro.message);
    }
  }, intervaloMs);

  // retorna funcao para cancelar o polling
  return () => {
    clearInterval(id);
    console.log("Polling cancelado.");
  };
}

// --- LONG-POLLING ---
// Cliente faz requisicao e servidor so responde quando tem novidade
// Ao receber resposta, cliente faz nova requisicao imediatamente
async function longPolling(url, onDados) {
  while (true) {
    try {
      console.log("[long-polling] aguardando resposta do servidor...");
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log("[long-polling] novidade recebida:", dados);
      onDados(dados);
    } catch (erro) {
      console.error("[long-polling] erro:", erro.message);
      // aguarda um pouco antes de reconectar em caso de erro
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// --- SERVER-SENT EVENTS (SSE) ---
// Conexao persistente: servidor envia eventos quando quiser
function conectarSSE(url, onMensagem) {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (evento) => {
    console.log("[SSE] mensagem:", evento.data);
    onMensagem(JSON.parse(evento.data));
  };

  eventSource.onerror = (erro) => {
    console.error("[SSE] erro na conexao:", erro);
    eventSource.close();
  };

  // retorna funcao para fechar a conexao
  return () => eventSource.close();
}

// --- WEBSOCKET ---
// Comunicacao bidirecional full-duplex
function conectarWebSocket(url, onMensagem) {
  const ws = new WebSocket(url);

  ws.onopen = () => console.log("[WS] conexao estabelecida");

  ws.onmessage = (evento) => {
    console.log("[WS] mensagem recebida:", evento.data);
    onMensagem(JSON.parse(evento.data));
  };

  ws.onclose = () => console.log("[WS] conexao encerrada");
  ws.onerror = (erro) => console.error("[WS] erro:", erro);

  // retorna objeto para enviar mensagens e fechar conexao
  return {
    enviar: (dados) => ws.send(JSON.stringify(dados)),
    fechar: () => ws.close(),
  };
}

// Comparativo dos padroes:
// XHR polling    => cliente pergunta em intervalo fixo (gasta banda mesmo sem novidade)
// Long-polling   => cliente espera servidor ter novidade (mais eficiente)
// SSE            => servidor envia quando quiser, conexao persistente (unidirecional)
// WebSocket      => bidirecional, ideal para chat/jogos/tempo-real
