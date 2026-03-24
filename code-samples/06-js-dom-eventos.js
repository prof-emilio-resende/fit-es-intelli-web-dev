// Exemplo 6: DOM + eventos (rodar no browser)

const botao = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");
const input = document.querySelector("#item");

if (!botao || !lista || !input) {
  throw new Error("Elementos #adicionar, #lista e #item sao obrigatorios no HTML.");
}

botao.addEventListener("click", (event) => {
  event.preventDefault();

  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.textContent = texto;
  lista.appendChild(li);

  input.value = "";
  input.focus();
});
