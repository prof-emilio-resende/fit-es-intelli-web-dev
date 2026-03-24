// Exemplo 13: OOP em TypeScript com classe abstrata e heranca

abstract class Conta {
  constructor(public titular: string, protected saldo: number) {}

  depositar(valor: number): void {
    this.saldo += valor;
  }

  abstract sacar(valor: number): boolean;

  extrato(): string {
    return `${this.titular} - saldo: ${this.saldo.toFixed(2)}`;
  }
}

class ContaCorrente extends Conta {
  sacar(valor: number): boolean {
    if (valor > this.saldo) return false;
    this.saldo -= valor;
    return true;
  }
}

class ContaEspecial extends Conta {
  constructor(titular: string, saldo: number, private limite: number) {
    super(titular, saldo);
  }

  sacar(valor: number): boolean {
    if (valor > this.saldo + this.limite) return false;
    this.saldo -= valor;
    return true;
  }
}

const contaA = new ContaCorrente("Julia", 200);
const contaB = new ContaEspecial("Rafa", 200, 100);

contaA.sacar(80);
contaB.sacar(260);

console.log(contaA.extrato());
console.log(contaB.extrato());
