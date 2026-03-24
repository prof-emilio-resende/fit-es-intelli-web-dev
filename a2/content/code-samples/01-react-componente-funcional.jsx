// Exemplo 1: componente funcional basico em React
// Componentes sao funcoes que retornam JSX (HTML)

function Saudacao({ nome, cargo }) {
  return (
    <div>
      <h1>Ola, {nome}!</h1>
      <p>Cargo: {cargo}</p>
    </div>
  );
}

function ListaAlunos({ alunos }) {
  return (
    <ul>
      {alunos.map((aluno) => (
        <li key={aluno.id}>
          {aluno.nome} - {aluno.curso}
        </li>
      ))}
    </ul>
  );
}

// Componente raiz que combina os anteriores
function App() {
  const alunos = [
    { id: 1, nome: "Ana", curso: "Engenharia" },
    { id: 2, nome: "Bruno", curso: "ADS" },
    { id: 3, nome: "Carla", curso: "Sistemas" },
  ];

  return (
    <div>
      <Saudacao nome="Turma" cargo="Intelligent Web Development" />
      <h2>Alunos:</h2>
      <ListaAlunos alunos={alunos} />
    </div>
  );
}

export default App;

// Conceitos demonstrados:
// - Componente como funcao que retorna JSX
// - Props (propriedades) passadas entre componentes
// - Renderizacao de listas com .map() e key
// - Composicao de componentes
