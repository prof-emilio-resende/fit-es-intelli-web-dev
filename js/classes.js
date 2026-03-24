function Usuario(nome) {
    console.log("Criando um novo usuário...");
    this.nome = nome;
}

class Admin extends Usuario {
    constructor(nome) {
        super(nome);
        this.nivel = "admin";
        console.log("Criando um novo admin...");
    }
}


module.exports = { Usuario, Admin };