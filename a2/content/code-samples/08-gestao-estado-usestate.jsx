// Exemplo 8: Gestao de Estado Local com useState
// Estado local: vive no proprio componente, nao e compartilhado

import { useState } from "react";

// --- CONTADOR SIMPLES ---
function Contador() {
  const [contagem, setContagem] = useState(0); // valor inicial = 0

  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>+1</button>
      <button onClick={() => setContagem(contagem - 1)}>-1</button>
      <button onClick={() => setContagem(0)}>Zerar</button>
    </div>
  );
}

// --- FORMULARIO CONTROLADO ---
function FormularioCadastro() {
  const [form, setForm] = useState({ nome: "", email: "", curso: "" });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // spread para nao perder outros campos
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados enviados:", form);
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div>
        <p>Cadastro realizado! Bem-vindo, {form.nome}.</p>
        <button onClick={() => { setForm({ nome: "", email: "", curso: "" }); setEnviado(false); }}>
          Novo cadastro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px" }}>
      <input name="nome"   value={form.nome}   onChange={handleChange} placeholder="Nome" />
      <input name="email"  value={form.email}  onChange={handleChange} placeholder="Email" type="email" />
      <input name="curso"  value={form.curso}  onChange={handleChange} placeholder="Curso" />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

// --- LISTA COM ADICAO E REMOCAO ---
function ListaTarefas() {
  const [tarefas, setTarefas] = useState(["Estudar React", "Praticar hooks"]);
  const [novaTarefa, setNovaTarefa] = useState("");

  function adicionar() {
    if (!novaTarefa.trim()) return;
    setTarefas([...tarefas, novaTarefa.trim()]); // nunca mutate o array diretamente
    setNovaTarefa("");
  }

  function remover(index) {
    setTarefas(tarefas.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        <input value={novaTarefa} onChange={(e) => setNovaTarefa(e.target.value)} placeholder="Nova tarefa" />
        <button onClick={adicionar}>Adicionar</button>
      </div>
      <ul>
        {tarefas.map((t, i) => (
          <li key={i}>
            {t} <button onClick={() => remover(i)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Regras do useState:
// 1. Nunca mutar o estado diretamente (usar setX)
// 2. Para objetos/arrays, sempre criar nova referencia (spread)
// 3. Atualizacoes sao assincronas (batched pelo React)
// 4. Estado isolado por instancia de componente

export { Contador, FormularioCadastro, ListaTarefas };
