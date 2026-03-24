const variaveis = require("./variaveis");
const { criaDialogo } = require("./funcoes");
const { Usuario, Admin } = require("./classes");
const { obj } = require("./this");
const { loggerBuilder } = require("./closures");

const fctDialogo = criaDialogo("ola");
fctDialogo();
fctDialogo();

new Usuario("Emilio");
new Admin("Emilio");
obj.calcular(1,1);

const logger = loggerBuilder("INFO");
logger(obj);
logger(variaveis);