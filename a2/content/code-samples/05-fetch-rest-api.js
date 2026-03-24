// Exemplo 5: Fetch API com REST
// Demonstra os verbos HTTP: GET, POST, PUT, DELETE
// Execute: node code-samples/05-fetch-rest-api.js
// (requer Node 18+ com fetch nativo, ou instale node-fetch)

const BASE_URL = "https://jsonplaceholder.typicode.com";

// --- GET: buscar recursos ---
async function listarPosts() {
  const resposta = await fetch(`${BASE_URL}/posts?_limit=3`);
  const posts = await resposta.json();
  console.log("GET /posts:");
  posts.forEach((p) => console.log(`  [${p.id}] ${p.title}`));
}

async function buscarPost(id) {
  const resposta = await fetch(`${BASE_URL}/posts/${id}`);
  if (!resposta.ok) throw new Error(`Post ${id} nao encontrado`);
  const post = await resposta.json();
  console.log(`\nGET /posts/${id}:`, post.title);
}

// --- POST: criar recurso ---
async function criarPost(dados) {
  const resposta = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const criado = await resposta.json();
  console.log("\nPOST /posts - criado com id:", criado.id);
}

// --- PUT: atualizar recurso completo ---
async function atualizarPost(id, dados) {
  const resposta = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const atualizado = await resposta.json();
  console.log(`\nPUT /posts/${id}:`, atualizado.title);
}

// --- PATCH: atualizar campos especificos ---
async function editarTituloPost(id, novoTitulo) {
  const resposta = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: novoTitulo }),
  });
  const editado = await resposta.json();
  console.log(`\nPATCH /posts/${id} - novo titulo:`, editado.title);
}

// --- DELETE: remover recurso ---
async function deletarPost(id) {
  const resposta = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  console.log(`\nDELETE /posts/${id} - status:`, resposta.status);
}

// --- Tratamento de erros com fetch ---
async function buscarComTratamento(url) {
  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}: ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    if (erro instanceof TypeError) {
      console.error("Erro de rede (sem conexao?):", erro.message);
    } else {
      console.error("Erro da API:", erro.message);
    }
    throw erro;
  }
}

async function executar() {
  await listarPosts();
  await buscarPost(1);
  await criarPost({ title: "Novo post", body: "Conteudo", userId: 1 });
  await atualizarPost(1, { title: "Post atualizado", body: "Novo conteudo", userId: 1 });
  await editarTituloPost(1, "Titulo editado via PATCH");
  await deletarPost(1);
}

executar().catch(console.error);
