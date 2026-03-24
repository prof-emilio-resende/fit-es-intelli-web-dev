// Exemplo 7: assincronismo com Promise

function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buscarPerfilFake(usuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!usuario) {
        reject(new Error("Usuario invalido"));
        return;
      }

      resolve({
        usuario,
        perfil: "estudante",
      });
    }, 300);
  });
}

esperar(200)
  .then(() => buscarPerfilFake("emilio"))
  .then((dados) => {
    console.log("perfil carregado:", dados);
  })
  .catch((erro) => {
    console.error("falha:", erro.message);
  });
