// Exemplo 4: this em metodos tradicionais vs arrow functions

const conta = {
  titular: "Diego",
  saldo: 100,

  depositar(valor) {
    this.saldo += valor;
  },

  mostrarSaldo() {
    console.log(`${this.titular} possui saldo ${this.saldo}`);
  },

  mostrarSaldoComArrow: () => {
    // Arrow function nao cria this proprio.
    console.log("this em arrow:", this);
  },
};

conta.depositar(50);
conta.mostrarSaldo();
conta.mostrarSaldoComArrow();

const mostrar = conta.mostrarSaldo;

try {
  mostrar();
} catch (erro) {
  console.log("Erro ao chamar metodo sem contexto:", erro.message);
}

const mostrarComBind = conta.mostrarSaldo.bind(conta);
mostrarComBind();
