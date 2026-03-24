# Aula 2 — Design, REST e Gestão de Estado

**Intelligent Web Development | Faculdade Impacta**

> Este documento é o roteiro da aula. Cobre toda a teoria apresentada nos slides e referencia os exemplos práticos da pasta `code-samples/`.

---

## Sumário

1. [React — Visão Geral](#1-react--visão-geral)
2. [React — VDOM e Reconciliação](#2-react--vdom-e-reconciliação)
3. [React — Conceitos Fundamentais](#3-react--conceitos-fundamentais)
4. [React — Error Boundaries](#4-react--error-boundaries)
5. [JavaScript XHR e Padrões de Comunicação](#5-javascript-xhr-e-padrões-de-comunicação)
6. [Design Systems](#6-design-systems)
7. [Atomic Design](#7-atomic-design)
8. [Gestão de Estado no Cliente](#8-gestão-de-estado-no-cliente)
9. [Dicas Úteis](#9-dicas-úteis)
10. [Referências](#10-referências)

---

## 1. React — Visão Geral

### O que é React?

React é uma **biblioteca JavaScript para construção de interfaces** web e nativas. Ao contrário de frameworks como Angular, React foca em uma única responsabilidade: renderizar componentes na tela e reagir a mudanças de dados.

Pontos centrais:

- **Orientado a componentes** — a UI é decomposta em peças reutilizáveis e independentes
- **Componentes são funções** — uma função que recebe dados (props) e retorna JSX (HTML + JS)
- **Reativo** — quando os dados mudam, o React re-renderiza apenas o que precisa
- **Fullstack** — com frameworks como Next.js, React roda no servidor também

### Estrutura de um componente funcional

```jsx
function Saudacao({ nome }) {
  return <h1>Olá, {nome}!</h1>;
}
```

- A função é o componente
- `{ nome }` é a desestruturação das **props**
- O retorno é **JSX** — uma extensão de sintaxe que parece HTML mas é JavaScript
- Para renderizar: `<Saudacao nome="Turma" />`

### Configurando um projeto React com Vite

```bash
npm create vite@latest meu-projeto -- --template react
cd meu-projeto
npm install
npm run dev
```

> Vite é o build tool recomendado hoje (substitui o Create React App). Inicia o servidor em milissegundos com Hot Module Replacement.

**Exemplo prático:** [`code-samples/01-react-componente-funcional.jsx`](code-samples/01-react-componente-funcional.jsx)

---

## 2. React — VDOM e Reconciliação

### O problema do DOM

Manipular o DOM do browser diretamente é lento — cada alteração pode disparar recálculo de layout e repintura da tela. Em aplicações com muitas atualizações por segundo isso se torna um gargalo.

### Virtual DOM (VDOM)

O React mantém em memória uma **representação leve da árvore DOM** — o Virtual DOM. O fluxo é:

```
React App  →  VDOM (memória)  →  DOM (browser)
     ↑__________________________|
          eventos / dados
```

1. Ao mudar o estado, o React re-executa as funções dos componentes afetados
2. Gera um novo VDOM
3. **Reconcilia** — compara o novo VDOM com o anterior (diff)
4. Aplica **somente as diferenças** no DOM real

### React DOM

O pacote `react-dom` é responsável por tudo que interage com o ambiente de browser:

- **Hooks de browser** — como `useEffect` (roda após pintar a tela) e `useLayoutEffect` (roda antes)
- **Componentes** — suporte a todas as tags HTML nativas
- **APIs** — `createPortal`, `createRoot`, `flushSync`

```jsx
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

> `createRoot` é a API do React 18. Ativa o modo concorrente, que permite o React priorizar atualizações mais urgentes.

**Exemplos práticos:** [`code-samples/01`](code-samples/01-react-componente-funcional.jsx) e [`code-samples/02`](code-samples/02-react-vdom-purity.jsx)

---

## 3. React — Conceitos Fundamentais

### Purity (Pureza)

Um componente **puro** garante que:

- As mesmas props sempre produzem o mesmo JSX
- O processo de renderização não tem efeitos colaterais (não modifica variáveis externas, não faz chamadas de rede, não escreve no DOM)

```jsx
// PURO ✓
function Preco({ valor, desconto }) {
  return <span>R$ {(valor * (1 - desconto)).toFixed(2)}</span>;
}

// IMPURO ✗ — modifica variável externa durante o render
let contadorRenders = 0;
function ComponenteRuim() {
  contadorRenders++; // efeito colateral!
  return <p>{contadorRenders}</p>;
}
```

O React pode chamar componentes múltiplas vezes em modo de desenvolvimento (StrictMode) exatamente para detectar impurezas.

### Effects

Quando você precisa fazer algo que "escapa" do React — chamada de API, timer, assinar um evento do browser, manipular um player de vídeo — use `useEffect`:

```jsx
useEffect(() => {
  const id = setInterval(() => setHora(new Date()), 1000);
  return () => clearInterval(id); // cleanup ao desmontar
}, []); // [] = executa só na montagem
```

| Segundo argumento | Quando executa |
|---|---|
| Ausente | Após cada render |
| `[]` | Só na montagem |
| `[a, b]` | Quando `a` ou `b` mudam |

### Refs

`useRef` dá acesso a um valor que **persiste entre renders sem causar re-render**, e também permite apontar diretamente para um elemento DOM nativo:

```jsx
const inputRef = useRef(null);

// Focar o input programaticamente (acesso ao DOM nativo)
inputRef.current.focus();

return <input ref={inputRef} />;
```

Usos comuns: focar elemento, controlar player de mídia, armazenar timers, salvar valor anterior.

**Exemplo prático:** [`code-samples/02-react-vdom-purity.jsx`](code-samples/02-react-vdom-purity.jsx)

---

## 4. React — Error Boundaries

### O problema

Um erro JavaScript não tratado dentro de um componente filho pode **quebrar a árvore inteira** e deixar a tela em branco. Error Boundaries são componentes que capturam esses erros e exibem um fallback adequado.

### Implementação

Até o React 18, Error Boundaries só existem como **class components**:

```jsx
class ErrorBoundary extends Component {
  state = { temErro: false };

  static getDerivedStateFromError() {
    return { temErro: true };
  }

  componentDidCatch(erro, info) {
    console.error(erro, info.componentStack);
  }

  render() {
    if (this.state.temErro) return <p>Algo deu errado.</p>;
    return this.props.children;
  }
}

// Uso:
<ErrorBoundary>
  <ComponenteQuePoderFalhar />
</ErrorBoundary>
```

### Alternativa funcional

A biblioteca `react-error-boundary` (pacote npm) oferece uma versão funcional:

```jsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<p>Erro!</p>}>
  <ComponenteQuePoderFalhar />
</ErrorBoundary>
```

> **Dica de aula:** colocar um Error Boundary em volta de cada seção independente da UI (sidebar, feed, modal) evita que um erro num lugar derrube a página inteira.

**Exemplo prático:** [`code-samples/03-react-error-boundary.jsx`](code-samples/03-react-error-boundary.jsx)

---

## 5. JavaScript XHR e Padrões de Comunicação

### XHR clássico

`XMLHttpRequest` foi a primeira API do browser para comunicação assíncrona com o servidor (o "X" do AJAX). Ainda é relevante para entender polling e long-polling.

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/dados");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const dados = JSON.parse(xhr.responseText);
  }
};
xhr.send();
```

Hoje usamos `fetch` (Promise-based) no lugar do XHR, mas o mecanismo por baixo é o mesmo.

### Polling

O cliente pergunta ao servidor em **intervalos fixos**: "tem alguma novidade?". Simples de implementar, mas ineficiente — faz requisições mesmo quando não há dados novos.

```
Cliente ──GET /poll──► Servidor
Cliente ◄─────────── resposta (pode estar vazia)
... aguarda N segundos ...
Cliente ──GET /poll──► Servidor
Cliente ◄─────────── resposta (agora com dado)
```

### Long-Polling

O cliente faz a requisição e o servidor **segura a conexão aberta** até ter algo para responder. Quando responde, o cliente abre imediatamente uma nova requisição.

```
Cliente ──GET /poll──► Servidor (conexão fica aberta)
                        ... servidor aguarda novidade ...
Cliente ◄─────────── resposta (com dado real)
Cliente ──GET /poll──► Servidor (nova conexão imediata)
```

Mais eficiente que polling simples, mas ainda cria uma nova conexão TCP a cada ciclo.

### Server-Sent Events (SSE)

Conexão HTTP **persistente e unidirecional** — servidor empurra eventos quando quiser, sem o cliente precisar perguntar.

```js
const es = new EventSource("/api/eventos");
es.onmessage = (e) => console.log(JSON.parse(e.data));
```

Ideal para: feeds em tempo real, notificações, dashboards de monitoramento.

### WebSocket

Protocolo **bidirecional e full-duplex** sobre uma única conexão TCP. Servidor e cliente podem enviar mensagens a qualquer momento.

```js
const ws = new WebSocket("wss://servidor/ws");
ws.onmessage = (e) => console.log(e.data);
ws.send(JSON.stringify({ tipo: "chat", texto: "oi" }));
```

Ideal para: chat, jogos multiplayer, colaboração em tempo real, trading.

### Comparativo

| Técnica | Direção | Conexão | Caso de uso típico |
|---|---|---|---|
| Polling | cliente → servidor (repetido) | nova a cada vez | status simples |
| Long-Polling | cliente → servidor (espera) | nova após resposta | notificações |
| SSE | servidor → cliente | persistente | feeds, dashboards |
| WebSocket | bidirecional | persistente | chat, jogos |

**Exemplo prático:** [`code-samples/04-xhr-polling.js`](code-samples/04-xhr-polling.js) e [`code-samples/05-fetch-rest-api.js`](code-samples/05-fetch-rest-api.js)

---

## 6. Design Systems

### Por que Design Systems existem?

Sem uma linguagem visual unificada, produtos crescem com inconsistências: botões com tamanhos diferentes, espaçamentos arbitrários, paletas que se contradizem. Andreas Pihlström (Pinterest) descreveu o problema:

> *"Over the years, the designs for our website, apps and marketing had all begun to drift, so they no longer felt like they had the same personality... the interface had begun to feel cluttered and hard to understand."*

Um Design System é um **conjunto de decisões compartilhadas** — tokens, componentes, padrões e diretrizes — que garante consistência em todos os produtos de uma organização.

### Granularidade: Page vs Component

A mudança de paradigma dos anos 2010 foi passar de pensar em **páginas** (cada tela é um design único) para pensar em **componentes** (a tela é montada a partir de peças reutilizáveis).

Benefícios do modelo orientado a componentes:
- Alteração de um componente se propaga para todas as telas
- Times diferentes podem trabalhar em paralelo
- Testes são feitos no componente, não na página inteira

### Hierarquia de elementos

```
Elementos (itens isolados)
  └─ Componentes (grupo de elementos com propósito)
       └─ Grupos de Componentes (seções completas da UI)
            └─ Páginas
```

Exemplo prático: um `Button` é um elemento. `Button` + `Input` + `Label` formam um componente de busca. A barra de busca mais o logo e o menu formam o `Header`.

### Design Tokens

Tokens são as **variáveis fundamentais** do sistema — os valores que alimentam todos os componentes:

```js
// Tokens primitivos (valores absolutos)
const cinza50 = "#9e9e9e";
const espacamentoMd = "16px";

// Tokens semânticos (significado, não valor)
const corTextoSecundario = cinza50;
const paddingInterno = espacamentoMd;
```

Separar primitivos de semânticos permite trocar de tema sem alterar os componentes — basta reatribuir os tokens semânticos.

**Exemplo prático:** [`code-samples/06-design-tokens.js`](code-samples/06-design-tokens.js)

### Grid System

O grid divide a tela em colunas de largura consistente. Componentes se encaixam em múltiplos de colunas, garantindo alinhamento visual em qualquer tamanho de tela. A maioria dos sistemas usa 12 colunas (divisível por 2, 3, 4 e 6).

### Temas (Theming)

Temas aplicam diferentes conjuntos de tokens semânticos à mesma estrutura de componentes:

| Token semântico | Tema claro | Tema escuro |
|---|---|---|
| `corFundo` | `#ffffff` | `#212121` |
| `corTexto` | `#212121` | `#ffffff` |
| `corDestaque` | `#2196f3` | `#90caf9` |

### Design Systems de mercado

Grandes empresas publicaram seus sistemas como projetos open source:

| Empresa | Sistema | Tecnologia |
|---|---|---|
| Google | Material Design | Web Components / React |
| IBM | Carbon | React |
| Shopify | Polaris | React |
| Atlassian | Atlassian DS | React |
| GitLab | Pajamas | Vue |
| Firefox | Photon | — |

---

## 7. Atomic Design

Atomic Design é uma **metodologia de organização de componentes** proposta por Brad Frost, que usa a analogia da química para estruturar a UI de forma progressiva.

### Os 5 níveis

```
Atoms → Molecules → Organisms → Templates → Pages
```

#### Atoms (Átomos)
Os menores blocos de construção da UI — elementos HTML básicos com estilo e comportamento mínimos:
- `<Button>`, `<Input>`, `<Label>`, `<Avatar>`, `<Icon>`, `<Badge>`

```jsx
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

#### Molecules (Moléculas)
Grupos de átomos que juntos têm uma função específica:
- `SearchForm` = `Label` + `Input` + `Button`
- `UserCard` = `Avatar` + `Name` + `Role`

#### Organisms (Organismos)
Seções completas e independentes da interface, compostas de moléculas:
- `Header` = `Logo` + `Nav` + `SearchForm`
- `ProductList` = múltiplos `ProductCard`

#### Templates
A estrutura de layout da página **sem dados reais** — wireframe em código. Define onde cada organismo se encaixa.

#### Pages
Templates preenchidos com **dados reais**. É o que o usuário vê.

### Mapeamento para React

| Atomic Design | Onde fica no projeto |
|---|---|
| Atoms | `src/components/atoms/` |
| Molecules | `src/components/molecules/` |
| Organisms | `src/components/organisms/` |
| Templates | `src/templates/` |
| Pages | `src/pages/` |

**Exemplo prático:** [`code-samples/07-atomic-design.jsx`](code-samples/07-atomic-design.jsx) — demonstra todos os 5 níveis em um único arquivo, construindo uma página de listagem de usuários.

---

## 8. Gestão de Estado no Cliente

### O que é estado?

**Estado** é qualquer dado que, quando muda, deve causar uma atualização visual. Exemplos: itens do carrinho, usuário logado, filtro ativo, resultado de uma busca.

### Prop Drilling vs State Manager

**Prop Drilling** é passar dados de um componente pai para um neto através de intermediários que não usam os dados:

```
App (tem o dado)
 └─ Layout (só passa adiante)
      └─ Sidebar (só passa adiante)
           └─ UserMenu (usa o dado)
```

Problemas: verboso, frágil, difícil de refatorar.

**State Manager** centraliza o estado fora da árvore de componentes, permitindo que qualquer componente acesse diretamente:

```
Estado Global
    ↓        ↓
 Sidebar   UserMenu   (acesso direto, sem intermediários)
```

### Mapa de ferramentas de estado no React

```
React State Management
├── Local State (estado do componente)
│   ├── useState       — estado simples
│   └── useReducer     — lógica complexa / múltiplas transições
└── Shared State (estado compartilhado)
    ├── Context API    — solução nativa do React
    └── Bibliotecas externas
        ├── Zustand    — simples, baseado em hooks
        ├── Jotai      — atômico, granular
        ├── Recoil     — atômico, do Facebook
        ├── Redux TK   — poderoso, ideal para apps grandes
        └── MobX       — reativo, baseado em observables
```

---

### useState — Estado Local Simples

`useState` retorna um par `[valor, setter]`. Toda chamada ao setter agenda um re-render do componente.

```jsx
const [contagem, setContagem] = useState(0);

// Atualização direta
setContagem(contagem + 1);

// Atualização funcional (mais segura quando depende do valor anterior)
setContagem((prev) => prev + 1);
```

**Regra de ouro:** nunca mutar o estado diretamente. Para objetos e arrays, sempre criar nova referência:

```jsx
// ERRADO ✗
estado.nome = "Ana";
setState(estado);

// CERTO ✓
setState({ ...estado, nome: "Ana" });
```

**Exemplo prático:** [`code-samples/08-gestao-estado-usestate.jsx`](code-samples/08-gestao-estado-usestate.jsx) — contador, formulário controlado e lista com adição/remoção.

---

### useReducer — Estado Local Complexo

Quando o estado tem múltiplas ações inter-relacionadas, `useReducer` organiza melhor que vários `useState`. O padrão vem do Redux / Flux.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENTAR": return { ...state, contagem: state.contagem + 1 };
    case "RESETAR":     return { contagem: 0 };
    default: return state;
  }
}

const [state, dispatch] = useReducer(reducer, { contagem: 0 });

dispatch({ type: "INCREMENTAR" });
```

| Critério | useState | useReducer |
|---|---|---|
| Número de campos | poucos | muitos |
| Transições | simples | complexas / inter-relacionadas |
| Testabilidade | ok | melhor (reducer é função pura) |
| Familiaridade | intuitivo | curva maior |

**Exemplo prático:** [`code-samples/09-gestao-estado-usereducer.jsx`](code-samples/09-gestao-estado-usereducer.jsx) — carrinho de compras com adicionar, remover, alterar quantidade e limpar.

---

### Context API — Estado Compartilhado Nativo

A Context API resolve o Prop Drilling sem biblioteca externa. Funciona em três passos:

**1. Criar o contexto**
```jsx
const TemaContext = createContext(null);
```

**2. Prover o valor (Provider envolve a árvore)**
```jsx
function TemaProvider({ children }) {
  const [tema, setTema] = useState("claro");
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
```

**3. Consumir em qualquer descendente**
```jsx
function BotaoTema() {
  const { tema, setTema } = useContext(TemaContext);
  return <button onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}>
    Tema: {tema}
  </button>;
}
```

> **Atenção:** toda vez que o valor do Provider mudar, **todos os componentes que consomem aquele contexto re-renderizam**. Para contextos que mudam frequentemente (ex: posição do mouse), prefira uma biblioteca externa.

**Exemplo prático:** [`code-samples/10-gestao-estado-context.jsx`](code-samples/10-gestao-estado-context.jsx) — contexto de tema (claro/escuro) e contexto de autenticação, com hooks customizados `useTema()` e `useUsuario()`.

---

## 9. Dicas Úteis

### Servidor local rápido para desenvolvimento

Sem instalar nada além do Python (que já vem no macOS/Linux):

```bash
# Servir a pasta atual na porta 8000
python3 -m http.server 8000
```

Útil para testar HTML/CSS/JS puro sem configurar um projeto completo.

### Deploy na web

| Plataforma | Comando | Melhor para |
|---|---|---|
| **Vercel** | `npx vercel` | Projetos React/Next.js |
| **Surge** | `npx surge` | HTML/CSS/JS estático |

Ambos oferecem HTTPS e URL pública gratuita em segundos.

### Recursos para continuar estudando

| Recurso | O que tem |
|---|---|
| [MDN Web Docs](https://developer.mozilla.org/) | Referência completa de HTML, CSS e JS |
| [javascript.info](https://javascript.info/) | Tutorial profundo de JS moderno |
| [W3C Brasil](https://www.w3c.br/) | Padrões web em português |
| [CSS-Tricks](https://css-tricks.com/) | Tutoriais, dicas e referências de CSS/layout |
| Inside Browser (Google) | Série sobre como o browser funciona por dentro |

---

## 10. Referências

- GRIGORIK, Ilya. **High Performance Browser Networking**. O'Reilly.
- PINHO, Diego Martins. **ECMAScript 6 — Entre de Cabeça no Futuro do JavaScript**. Casa do Código.
- BANKS, Alex; PORCELLO, Eve. **Learning React**. O'Reilly.
- VESSELOV, Sarrah; DAVIS, Taurie. **Building Design Systems**. Apress.
- GEERS, Michael. **Micro Frontends in Action**. Manning.

---

## Code Samples — Índice Rápido

| # | Arquivo | Tópico | Como rodar |
|---|---------|--------|-----------|
| 01 | `01-react-componente-funcional.jsx` | Componente funcional, props, JSX | Projeto React |
| 02 | `02-react-vdom-purity.jsx` | Purity, useEffect, useRef | Projeto React |
| 03 | `03-react-error-boundary.jsx` | Error Boundary (class + lib) | Projeto React |
| 04 | `04-xhr-polling.js` | XHR, Polling, Long-Polling, SSE, WebSocket | Browser |
| 05 | `05-fetch-rest-api.js` | Fetch API + verbos REST | `node code-samples/05-fetch-rest-api.js` |
| 06 | `06-design-tokens.js` | Design Tokens: primitivos, semânticos, temas | `node code-samples/06-design-tokens.js` |
| 07 | `07-atomic-design.jsx` | Atoms → Molecules → Organisms → Template → Page | Projeto React |
| 08 | `08-gestao-estado-usestate.jsx` | useState: contador, formulário, lista | Projeto React |
| 09 | `09-gestao-estado-usereducer.jsx` | useReducer: carrinho de compras | Projeto React |
| 10 | `10-gestao-estado-context.jsx` | Context API: tema e autenticação | Projeto React |

### Criar projeto React para os exemplos JSX

```bash
npm create vite@latest meu-projeto -- --template react
cd meu-projeto
npm install
# copie os arquivos .jsx para src/ e importe no App.jsx
npm run dev
```
