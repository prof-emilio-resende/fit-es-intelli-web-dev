import * as crypto from "crypto";

class Block {
  index: number;
  timestamp: string;
  data: unknown;
  hashAnterior: string;
  hash: string;

  constructor(index: number, data: unknown, hashAnterior = "0") {
    this.index = index;
    this.timestamp = new Date().toISOString();
    this.data = data;
    this.hashAnterior = hashAnterior;
    this.hash = this.calcularHash();
  }

  calcularHash(): string {
    const conteudo = this.index + this.timestamp + JSON.stringify(this.data) + this.hashAnterior;
    return crypto.createHash("sha256").update(conteudo).digest("hex");
  }
}

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [new Block(0, "Bloco Gênesis")];
  }

  adicionarBloco(data: unknown): void {
    const ultimo = this.chain[this.chain.length - 1]!;
    const novo = new Block(this.chain.length, data, ultimo.hash);
    this.chain.push(novo);
  }

  isValida(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const atual = this.chain[i]!;
      const anterior = this.chain[i - 1]!;
      if (atual.hash !== atual.calcularHash()) return false;
      if (atual.hashAnterior !== anterior.hash) return false;
    }
    return true;
  }
}

export { Block, Blockchain };

// Uso
const bc = new Blockchain();
bc.adicionarBloco({ de: "Alice", para: "Bob", valor: 50 });
bc.adicionarBloco({ de: "Bob", para: "Carol", valor: 20 });

console.log("Válida?", bc.isValida());
console.log(JSON.stringify(bc.chain, null, 2));
