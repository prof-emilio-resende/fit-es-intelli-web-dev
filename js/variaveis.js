// variaveis, constantes ...
const nome = "Emilio";
const idade = 37;
const cidades = ["São Caetano do Sul", "São Paulo"];
let sobrenome = "Resende";

const pessoa = {
    idade: 37,
    nome: "Outro Nome Qualquer"
};

const { idade: idade2 } = pessoa;
sobrenome = "Murta Resende";

module.exports = {
    nome,
    idade,
    cidades,
    sobrenome,
    pessoa,
    idade2
};