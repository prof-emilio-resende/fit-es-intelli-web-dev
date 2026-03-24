class Objeto {
    constructor() {
        this.nro = 10;
    };
    calcular = (a,b) => {
        console.log(this);
        console.log(this.nro);
        return a + b;
    }
}

const contexto = {
    nro: 20,
}

const obj = new Objeto();
obj.calcular(1,1);
obj.calcular.call(contexto, 1, 1);
obj.calcular.bind(contexto)(1,1);

module.exports = { obj };