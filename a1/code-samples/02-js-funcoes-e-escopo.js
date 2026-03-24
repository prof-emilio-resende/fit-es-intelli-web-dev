// Exemplo 2: funcoes, escopo lexico e callbacks

function somar(a, b) {
  return a + b;
}

function executarOperacao(a, b, operacao) {
  return operacao(a, b);
}

function criarSaudacao(prefixo) {
  return function saudar(nome) {
    return `${prefixo}, ${nome}!`;
  };
}

const resultadoSoma = executarOperacao(5, 7, somar);
const saudacaoFormal = criarSaudacao("Boa noite");
const saudacaoAmigavel = criarSaudacao("Oi");

console.log("resultadoSoma:", resultadoSoma);
console.log(saudacaoFormal("Turma"));
console.log(saudacaoAmigavel("Pessoal"));
