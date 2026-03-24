// Exemplo 3: prototype chain e class (acucar sintatico)

function Usuario(nome) {
  this.nome = nome;
}

Usuario.prototype.descrever = function descrever() {
  return `Usuario: ${this.nome}`;
};

class Admin extends Usuario {
  constructor(nome, nivel) {
    super(nome);
    this.nivel = nivel;
  }

  descrever() {
    return `${super.descrever()} (nivel ${this.nivel})`;
  }
}

const usuario = new Usuario("Bruna");
const admin = new Admin("Carlos", 2);

console.log(usuario.descrever());
console.log(admin.descrever());

console.log("admin instanceof Admin:", admin instanceof Admin);
console.log("admin instanceof Usuario:", admin instanceof Usuario);
console.log(
  "prototype de Admin aponta para Usuario:",
  Object.getPrototypeOf(Admin.prototype) === Usuario.prototype
);
