// Exemplo 5: closure para encapsular estado privado

function criarContador(inicial = 0) {
  let valor = inicial;

  return {
    incrementar() {
      valor += 1;
      return valor;
    },
    decrementar() {
      valor -= 1;
      return valor;
    },
    atual() {
      return valor;
    },
  };
}

const contadorA = criarContador();
const contadorB = criarContador(10);

console.log(contadorA.incrementar()); // 1
console.log(contadorA.incrementar()); // 2
console.log(contadorA.atual()); // 2

console.log(contadorB.decrementar()); // 9
console.log(contadorB.atual()); // 9
