// Exemplo 7: Atomic Design com React
// Hierarquia: Atoms => Molecules => Organisms => Templates => Pages

// ============================================================
// ATOMS - elementos HTML mais basicos, sem dependencias
// ============================================================

function Botao({ children, variante = "primario", onClick }) {
  const estilos = {
    primario:   { background: "#2196f3", color: "#fff" },
    secundario: { background: "transparent", color: "#2196f3", border: "1px solid #2196f3" },
    perigo:     { background: "#f44336", color: "#fff" },
  };
  return (
    <button style={{ padding: "8px 16px", borderRadius: "4px", cursor: "pointer", ...estilos[variante] }} onClick={onClick}>
      {children}
    </button>
  );
}

function Input({ label, tipo = "text", valor, onChange, placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <label style={{ fontSize: "14px", fontWeight: 500 }}>{label}</label>}
      <input type={tipo} value={valor} onChange={onChange} placeholder={placeholder}
        style={{ padding: "8px", border: "1px solid #e0e0e0", borderRadius: "4px" }} />
    </div>
  );
}

function Avatar({ src, alt, tamanho = 40 }) {
  return (
    <img src={src} alt={alt}
      style={{ width: tamanho, height: tamanho, borderRadius: "50%", objectFit: "cover" }} />
  );
}

// ============================================================
// MOLECULES - grupo de atoms com funcao especifica
// ============================================================

function FormularioBusca({ onBuscar }) {
  const [termo, setTermo] = useState("");

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
      <Input
        label="Buscar"
        valor={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Digite para buscar..."
      />
      <Botao onClick={() => onBuscar(termo)}>Buscar</Botao>
    </div>
  );
}

function CartaoUsuario({ nome, cargo, avatar }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
      <Avatar src={avatar} alt={nome} tamanho={48} />
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{nome}</p>
        <p style={{ margin: 0, fontSize: "14px", color: "#757575" }}>{cargo}</p>
      </div>
    </div>
  );
}

// ============================================================
// ORGANISMS - grupo de molecules formando secao completa
// ============================================================

function Header({ titulo, onBuscar }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #e0e0e0" }}>
      <h1 style={{ margin: 0 }}>{titulo}</h1>
      <FormularioBusca onBuscar={onBuscar} />
    </header>
  );
}

function ListaUsuarios({ usuarios }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px" }}>
      <h2>Usuarios</h2>
      {usuarios.map((u) => (
        <CartaoUsuario key={u.id} nome={u.nome} cargo={u.cargo} avatar={u.avatar} />
      ))}
    </section>
  );
}

// ============================================================
// TEMPLATES - estrutura de layout sem dados reais
// ============================================================

function TemplatePaginaPrincipal({ header, conteudo }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      {header}
      <main>{conteudo}</main>
    </div>
  );
}

// ============================================================
// PAGES - template preenchido com dados reais
// ============================================================

import { useState } from "react";

function PaginaUsuarios() {
  const [busca, setBusca] = useState("");

  const todosUsuarios = [
    { id: 1, nome: "Ana Silva", cargo: "Engenheira Frontend", avatar: "https://i.pravatar.cc/48?img=1" },
    { id: 2, nome: "Bruno Costa", cargo: "Dev Backend", avatar: "https://i.pravatar.cc/48?img=2" },
    { id: 3, nome: "Carla Mendes", cargo: "UX Designer", avatar: "https://i.pravatar.cc/48?img=3" },
  ];

  const usuariosFiltrados = todosUsuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <TemplatePaginaPrincipal
      header={<Header titulo="Equipe" onBuscar={setBusca} />}
      conteudo={<ListaUsuarios usuarios={usuariosFiltrados} />}
    />
  );
}

export default PaginaUsuarios;
