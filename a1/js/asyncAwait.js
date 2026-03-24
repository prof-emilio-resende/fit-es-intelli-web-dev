// Exemplo 8: async/await com tratamento de erros

async function buscarUsuario(id) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`Erro HTTP ${resposta.status}`);
  }

  return resposta.json();
}

async function executar() {
  try {
    const usuario = await buscarUsuario(1);
    console.log("nome:", usuario.name);
    console.log("email:", usuario.email);
  } catch (erro) {
    console.error("Erro ao buscar usuario:", erro.message);
  }
}

executar();
