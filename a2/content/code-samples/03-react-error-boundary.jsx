// Exemplo 3: Error Boundary no React
// Ate o React 18, so funciona como class component
// Alternativa moderna: biblioteca react-error-boundary

import { Component } from "react";

// --- CLASS COMPONENT (abordagem pre-React 19) ---
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { temErro: false, mensagem: "" };
  }

  static getDerivedStateFromError(error) {
    return { temErro: true, mensagem: error.message };
  }

  componentDidCatch(error, info) {
    console.error("Erro capturado:", error);
    console.error("Componente com erro:", info.componentStack);
  }

  render() {
    if (this.state.temErro) {
      return (
        <div style={{ color: "red", padding: "16px", border: "1px solid red" }}>
          <h2>Algo deu errado</h2>
          <p>{this.state.mensagem}</p>
          <button onClick={() => this.setState({ temErro: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Componente que lanca erro propositalmente para demonstracao
function ComponenteQuebrado({ lancarErro }) {
  if (lancarErro) {
    throw new Error("Falha inesperada no componente filho!");
  }
  return <p>Componente funcionando normalmente.</p>;
}

// Uso: o ErrorBoundary envolve o componente que pode falhar
function App() {
  return (
    <ErrorBoundary>
      <ComponenteQuebrado lancarErro={false} />
    </ErrorBoundary>
  );
}

export default App;

// Nota: com react-error-boundary (lib externa) da pra fazer funcional:
// import { ErrorBoundary } from "react-error-boundary";
// <ErrorBoundary fallback={<p>Erro!</p>}>
//   <ComponenteQuebrado />
// </ErrorBoundary>
