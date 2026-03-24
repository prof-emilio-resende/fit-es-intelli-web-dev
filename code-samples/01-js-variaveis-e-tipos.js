// Exemplo 1: tipos primitivos, objetos e arrays

const nome = "Ana";
const idade = 29;
const ativo = true;
const saldo = 1520.75;
const indefinido = undefined;
const vazio = null;

const pessoa = {
  nome,
  idade,
  ativo,
};

const habilidades = ["javascript", "html", "css"];

console.log("nome:", nome, "tipo:", typeof nome);
console.log("idade:", idade, "tipo:", typeof idade);
console.log("ativo:", ativo, "tipo:", typeof ativo);
console.log("saldo:", saldo, "tipo:", typeof saldo);
console.log("indefinido:", indefinido, "tipo:", typeof indefinido);
console.log("vazio:", vazio, "tipo:", typeof vazio);

console.log("pessoa:", pessoa);
console.log("habilidades:", habilidades);
