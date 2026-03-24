function exibeNomeCompleto(nome, sobrenome) {
    console.log(`${nome} ${sobrenome}`);
}

function criaSaudacao(nome, sobrenome, exibeNomeFct) {
    exibeNomeFct(nome, sobrenome);
}

function criaDialogo(texto) {
    return function() {
        console.log(texto);
    }
}

module.exports = {
    exibeNomeCompleto,
    criaSaudacao,
    criaDialogo
};