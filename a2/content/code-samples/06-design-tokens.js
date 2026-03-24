// Exemplo 6: Design Tokens - fundacao de um Design System
// Tokens sao as variaveis fundamentais de estilo: cores, espacamentos, tipografia
// Execute: node code-samples/06-design-tokens.js

// --- TOKENS PRIMITIVOS (valores brutos) ---
const primitivos = {
  cores: {
    cinza: {
      0:   "#ffffff",
      10:  "#f5f5f5",
      20:  "#eeeeee",
      30:  "#e0e0e0",
      40:  "#bdbdbd",
      50:  "#9e9e9e",
      60:  "#757575",
      70:  "#616161",
      80:  "#424242",
      90:  "#212121",
    },
    azul: {
      10: "#e3f2fd",
      50: "#2196f3",
      90: "#0d47a1",
    },
    vermelho: {
      10: "#ffebee",
      50: "#f44336",
      90: "#b71c1c",
    },
  },
  espacamento: {
    xs:  "4px",
    sm:  "8px",
    md:  "16px",
    lg:  "24px",
    xl:  "32px",
    xxl: "48px",
  },
  tipografia: {
    familia: {
      base:  "'Inter', sans-serif",
      mono:  "'Fira Code', monospace",
    },
    tamanho: {
      xs:   "12px",
      sm:   "14px",
      base: "16px",
      lg:   "18px",
      xl:   "24px",
      xxl:  "32px",
    },
    peso: {
      normal:    400,
      medio:     500,
      semibold:  600,
      bold:      700,
    },
  },
};

// --- TOKENS SEMANTICOS (tema claro) ---
const temaClaro = {
  fundo:        primitivos.cores.cinza[0],
  fundoSecund:  primitivos.cores.cinza[10],
  textoPrim:    primitivos.cores.cinza[90],
  textoSecund:  primitivos.cores.cinza[60],
  destaque:     primitivos.cores.azul[50],
  erro:         primitivos.cores.vermelho[50],
  borda:        primitivos.cores.cinza[30],
};

// --- TOKENS SEMANTICOS (tema escuro) ---
const temaEscuro = {
  fundo:        primitivos.cores.cinza[90],
  fundoSecund:  primitivos.cores.cinza[80],
  textoPrim:    primitivos.cores.cinza[0],
  textoSecund:  primitivos.cores.cinza[40],
  destaque:     primitivos.cores.azul[10],
  erro:         primitivos.cores.vermelho[10],
  borda:        primitivos.cores.cinza[70],
};

// --- TOKENS DE COMPONENTE ---
const botao = {
  paddingHorizontal: primitivos.espacamento.md,
  paddingVertical:   primitivos.espacamento.sm,
  fontSize:          primitivos.tipografia.tamanho.base,
  fontWeight:        primitivos.tipografia.peso.semibold,
  borderRadius:      "4px",
};

// Inspecionar tokens
console.log("=== Tokens Primitivos ===");
console.log("Cinza-50:", primitivos.cores.cinza[50]);
console.log("Espacamento-md:", primitivos.espacamento.md);
console.log("Font-size base:", primitivos.tipografia.tamanho.base);

console.log("\n=== Tema Claro ===");
Object.entries(temaClaro).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log("\n=== Tema Escuro ===");
Object.entries(temaEscuro).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

console.log("\n=== Token Botao ===");
console.log(botao);

// Conceitos:
// Primitivos => valores absolutos sem contexto semantico
// Semanticos => associam significado (fundo, texto, erro) desacoplando do valor
// Temas      => mesmos tokens semanticos, valores distintos por tema
