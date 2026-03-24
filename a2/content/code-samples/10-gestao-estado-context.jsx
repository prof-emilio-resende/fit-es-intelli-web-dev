// Exemplo 10: Estado Compartilhado com Context API
// Resolve o "Prop Drilling": dados acessiveis por qualquer descendente sem passar por todos

import { createContext, useContext, useReducer } from "react";

// --- 1. Criar o contexto ---
const TemaContext   = createContext(null);
const UsuarioContext = createContext(null);

// --- 2. Criar o Provider (envolve a arvore que precisa do estado) ---

function TemaProvider({ children }) {
  const [tema, setTema] = useReducer(
    (state) => (state === "claro" ? "escuro" : "claro"),
    "claro"
  );

  const estilos = {
    claro:  { fundo: "#ffffff", texto: "#212121", destaque: "#2196f3" },
    escuro: { fundo: "#212121", texto: "#ffffff", destaque: "#90caf9" },
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema: setTema, cores: estilos[tema] }}>
      {children}
    </TemaContext.Provider>
  );
}

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOGIN":  return { logado: true,  nome: action.nome, papel: action.papel };
        case "LOGOUT": return { logado: false, nome: null, papel: null };
        default: return state;
      }
    },
    { logado: false, nome: null, papel: null }
  );

  return (
    <UsuarioContext.Provider value={{ usuario, despachar: setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
}

// --- 3. Hooks customizados para consumir os contextos ---
function useTema()    { return useContext(TemaContext); }
function useUsuario() { return useContext(UsuarioContext); }

// --- Componentes que consomem o contexto diretamente (sem prop drilling) ---

function BotaoTema() {
  const { tema, alternarTema, cores } = useTema();
  return (
    <button onClick={alternarTema} style={{ background: cores.destaque, color: cores.fundo, padding: "8px 16px" }}>
      Tema atual: {tema}
    </button>
  );
}

function AreaUsuario() {
  const { usuario, despachar } = useUsuario();
  const { cores } = useTema();

  if (!usuario.logado) {
    return (
      <button onClick={() => despachar({ type: "LOGIN", nome: "Ana", papel: "admin" })}
        style={{ color: cores.texto }}>
        Fazer login
      </button>
    );
  }

  return (
    <div style={{ color: cores.texto }}>
      <span>Ola, {usuario.nome} ({usuario.papel})</span>
      <button onClick={() => despachar({ type: "LOGOUT" })}>Sair</button>
    </div>
  );
}

function Header() {
  const { cores } = useTema();
  return (
    <header style={{ background: cores.fundo, padding: "16px", borderBottom: `1px solid ${cores.destaque}`, display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: cores.texto, fontWeight: "bold" }}>Minha App</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <AreaUsuario />
        <BotaoTema />
      </div>
    </header>
  );
}

// --- App raiz: providers envolvem toda a arvore ---
function App() {
  return (
    <TemaProvider>
      <UsuarioProvider>
        <Header />
        {/* qualquer componente filho pode usar useTema() ou useUsuario() */}
        {/* sem precisar receber props de intermediarios */}
      </UsuarioProvider>
    </TemaProvider>
  );
}

export default App;

// Prop Drilling vs Context API:
// Prop Drilling  => pai passa dado para filho, filho passa para neto... verboso e fragil
// Context API    => dado disponivel para toda a sub-arvore sem passagem intermediaria
// Cuidado: Context re-renderiza todos consumidores ao mudar — use com moderacao
// Para estado global complexo, considere: Zustand, Jotai, Redux Toolkit
