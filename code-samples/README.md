# Code Samples - Aula 1

Ordem sugerida de exploracao:

1. `01-js-variaveis-e-tipos.js`
2. `02-js-funcoes-e-escopo.js`
3. `03-js-prototype-vs-class.js`
4. `04-js-this-contexto.js`
5. `05-js-closures-counter.js`
6. `06-js-dom-eventos.js`
7. `07-js-async-promises.js`
8. `08-js-fetch-async-await.js`
9. `09-js-state-management-simples.js`
10. `10-ts-tipos-basicos.ts`
11. `11-ts-interfaces-unions.ts`
12. `12-ts-generics.ts`
13. `13-ts-oo-classes.ts`

Como executar exemplos JS:

- `node content/code-samples/01-js-variaveis-e-tipos.js`

Como compilar exemplos TS (no projeto atual):

- `cd ts-basico`
- `npx tsc ../content/code-samples/ts/10-ts-tipos-basicos.ts --target ES2020 --module commonjs --outDir ../content/code-samples/dist`

Observacao:

- Alguns exemplos (como DOM) precisam rodar no browser.
- Os arquivos sao independentes e podem ser usados em qualquer ordem, mas a ordem acima segue uma progressao pedagogica.
