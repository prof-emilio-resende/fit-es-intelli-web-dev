// Exemplo 11: interfaces + union types + narrowing

interface User {
  id: number;
  nome: string;
}

interface ApiSuccess {
  status: "ok";
  data: User;
}

interface ApiError {
  status: "erro";
  mensagem: string;
}

type ApiResponse = ApiSuccess | ApiError;

function tratarResposta(resposta: ApiResponse): string {
  if (resposta.status === "ok") {
    return `Usuario: ${resposta.data.nome}`;
  }

  return `Falha: ${resposta.mensagem}`;
}

const sucesso: ApiResponse = { status: "ok", data: { id: 1, nome: "Carla" } };
const erro: ApiResponse = { status: "erro", mensagem: "Token expirado" };

console.log(tratarResposta(sucesso));
console.log(tratarResposta(erro));
