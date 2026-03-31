# Intelligent Web Development
## Aula 3 — Componentização e melhores práticas

**Professor:** Emilio Murta Resende — emilio.resende@impacta.edu.br
**Faculdade Impacta**

---

## Sumário

1. [Micro Frontends](#1-micro-frontends)
2. [Melhores Práticas com ReactJS](#2-melhores-práticas-com-reactjs)
3. [Introdução ao Next.js](#3-introdução-ao-nextjs)
4. [Referências](#4-referências)

---

## 1. Micro Frontends

### O problema: o monólito de frontend

À medida que produtos crescem, o frontend tende a virar um **monólito**: uma codebase enorme onde qualquer mudança pequena pode quebrar algo inesperado. Times ficam travados esperando uns pelos outros; o ciclo de deploy é lento e arriscado, e nenhuma equipe tem ownership claro de nada.

O conceito de **micro frontends** aplica ao lado cliente os mesmos princípios que os microserviços trouxeram ao backend: **decomposição por domínio de negócio**, com times autônomos e deploys independentes.

### A evolução arquitetural

#### Monólito

```
┌─────────────────────┐
│      Frontend       │  ← Um time, uma codebase
├─────────────────────┤
│      Backend        │
├─────────────────────┤
│      Database       │
└─────────────────────┘
```

Simples de começar, difícil de escalar com múltiplos times.

#### Frontend e Backend separados

```
┌─────────────────────┐
│   Frontend team     │  ← Time dedicado, mas ainda um monólito de frontend
└─────────────────────┘
┌─────────────────────┐
│   Backend team      │
└─────────────────────┘
```

#### Microservices com Micro Frontends

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Team A  │  │  Team B  │  │  Team C  │
│ Fragment │  │   Page   │  │Fragments │
└──────────┘  └──────────┘  └──────────┘
         \          |          /
          └──── Frontend ─────┘
               Integration
                    │
          ┌─────────────────┐
          │  Aggregation    │
          │  layer/gateway  │
          └─────────────────┘
         /    |       |    \
   Product Content Basket Payment
   service service service service
```

Cada equipe é **cross-funcional** — possui frontend, backend e banco de dados para o seu domínio.

### Fragmentos e Páginas

- **Fragment:** uma parte de uma página que pertence a um único time
- **Page:** uma rota completa, que pode ser composta por fragmentos de times diferentes

```
Página /produto/42:
┌──────────────────────────────┐
│  Header (Time Shared)        │
├──────────┬───────────────────┤
│ Produto  │  Recomendações    │
│ (Time A) │  (Time B)         │
├──────────┴───────────────────┤
│  Avaliações (Time C)         │
└──────────────────────────────┘
```

### Frontend Integration

A camada de integração resolve três desafios:

#### 1. Routing and page transitions

O shell da aplicação (container) gerencia as rotas e delega cada uma ao micro frontend responsável. Quando o usuário acessa `/produto/42`, o container carrega o micro frontend de produto — sem que o time de checkout precise saber disso.

#### 2. Composition

Montar uma página a partir de fragmentos independentes. Pode acontecer:

- **No servidor (SSI — Server Side Includes):** o servidor agrega os fragmentos antes de enviar o HTML
- **No cliente:** via iframes, Web Components ou Webpack Module Federation

#### 3. Communication

Fragmentos numa mesma página às vezes precisam se comunicar. A estratégia mais desacoplada é usar **Custom Events** do DOM:

```javascript
// Time A: produto adicionado ao carrinho
window.dispatchEvent(new CustomEvent('carrinho:item-adicionado', {
  detail: { produtoId: 42, quantidade: 1 }
}));

// Time B: mini-carrinho no header escuta o evento
window.addEventListener('carrinho:item-adicionado', ({ detail }) => {
  atualizarContador(detail.quantidade);
});
```

Essa abordagem mantém os times desacoplados — nenhum importa código do outro diretamente.

### Pipeline independente por equipe

```
Time Decide:  repo-A → build → test → deploy → servidor-A
                    (sem depender do Time Inspire)

Time Inspire: repo-B → build → test → deploy → servidor-B
                    (sem depender do Time Decide)
```

Benefícios práticos:
- Um time lança features sem esperar outro
- Um bug em produção do Time A não bloqueia o deploy do Time B
- Cada time escolhe seu próprio ritmo de atualização de dependências

### Shared topics: o que os times compartilham

Mesmo com pipelines independentes, alguns tópicos são transversais a todos os times:

| Shared topic | Por quê compartilhar? |
|---|---|
| **Design System** | Garante coesão visual mesmo com times e stacks diferentes |
| **Web performance** | Budgets de bundle, métricas de Core Web Vitals |
| **Sharing knowledge** | Guilds, RFCs, decisões arquiteturais documentadas |

### Trade-offs

| Benefício | Custo |
|---|---|
| Autonomia de times | Complexidade de infraestrutura maior |
| Deploys independentes | Risco de inconsistência visual entre fragmentos |
| Escalabilidade com muitos times | Duplicação de dependências (bundle maior) |
| Tecnologias diversas por time | Curva de aprendizado na integração |

> **Regra prática:** micro frontends fazem sentido quando você tem múltiplos times trabalhando no mesmo produto. Para projetos pequenos ou times únicos, a complexidade não se justifica.

---

## 2. Melhores Práticas com ReactJS

### Componentização inteligente

O principal erro de quem começa com React é criar componentes gigantes que fazem tudo. A regra de ouro é o **Princípio de Responsabilidade Única**: cada componente deve fazer uma coisa bem.

**Ruim — componente fazendo tudo:**

```jsx
function PaginaDeProduto({ id }) {
  const [produto, setProduto] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  // ... 200 linhas depois
}
```

**Melhor — responsabilidades separadas:**

```jsx
function PaginaDeProduto({ id }) {
  return (
    <>
      <DetalhesDoProduto id={id} />
      <ListaDeAvaliacoes produtoId={id} />
      <BotaoAdicionarCarrinho produtoId={id} />
    </>
  );
}
```

### Composição em vez de herança

React favorece **composição** para reutilizar comportamento. Em vez de herança de classes, componentes recebem outros componentes via props ou via `children`:

```jsx
// Componente genérico de Card
function Card({ titulo, children, acoes }) {
  return (
    <div className="card">
      <div className="card__header">
        <h2>{titulo}</h2>
        {acoes}
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}

// Uso com conteúdo variado
<Card titulo="Produto" acoes={<button>Editar</button>}>
  <p>Descrição do produto aqui.</p>
</Card>
```

### Custom Hooks: extraindo lógica reutilizável

Quando a mesma lógica de estado/efeito aparece em mais de um componente, extraia para um **custom hook**:

```jsx
// Hook reutilizável para buscar dados
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Uso em qualquer componente
function Produto({ id }) {
  const { data, loading, error } = useFetch(`/api/produtos/${id}`);

  if (loading) return <Spinner />;
  if (error) return <Erro mensagem={error.message} />;
  return <DetalheProduto produto={data} />;
}
```

### Evite prop drilling com Context

Quando um dado precisa chegar a componentes muito aninhados, passar por props em cada nível (prop drilling) torna o código frágil. Use a **Context API**:

```jsx
// Criação do contexto
const UsuarioContext = React.createContext(null);

// Provider no topo da árvore
function App() {
  const [usuario, setUsuario] = useState({ nome: 'Ada', papel: 'admin' });
  return (
    <UsuarioContext.Provider value={usuario}>
      <Layout />
    </UsuarioContext.Provider>
  );
}

// Consumo em qualquer nível da árvore, sem passar props
function MenuUsuario() {
  const usuario = useContext(UsuarioContext);
  return <span>Olá, {usuario.nome}</span>;
}
```

### Performance: evite re-renders desnecessários

#### `React.memo` — memoiza componentes

```jsx
// Sem memo: re-renderiza sempre que o pai re-renderiza
// Com memo: só re-renderiza se as props mudarem
const ItemLista = React.memo(function ItemLista({ nome, preco }) {
  return <li>{nome} — R$ {preco}</li>;
});
```

#### `useCallback` — memoiza funções

```jsx
// Sem useCallback: nova função criada a cada render, quebrando o memo dos filhos
const handleClick = useCallback(() => {
  adicionarAoCarrinho(produto.id);
}, [produto.id]); // só recria se produto.id mudar
```

#### `useMemo` — memoiza cálculos custosos

```jsx
const totalCarrinho = useMemo(
  () => itens.reduce((acc, item) => acc + item.preco * item.qtd, 0),
  [itens] // só recalcula se itens mudar
);
```

> Use essas otimizações com moderação — elas têm custo próprio. Otimize apenas quando houver problema de performance real medido.

### Estrutura de pastas

Uma estrutura escalável para projetos React médios/grandes:

```
src/
├── components/       # componentes genéricos e reutilizáveis
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── Button.test.jsx
│   └── Card/
├── features/         # módulos por domínio de negócio
│   ├── produto/
│   │   ├── PaginaProduto.jsx
│   │   ├── useProduto.js
│   │   └── produtoService.js
│   └── carrinho/
├── hooks/            # custom hooks compartilhados
├── services/         # camada de comunicação com APIs
├── context/          # contextos globais
└── pages/            # entrypoints de rota (ou use /features)
```

### Boas práticas de nomenclatura

| O quê | Convenção | Exemplo |
|---|---|---|
| Componentes | PascalCase | `BotaoDeCompra` |
| Hooks | camelCase com prefixo `use` | `useCarrinho` |
| Arquivos de componente | PascalCase | `BotaoDeCompra.jsx` |
| Funções e variáveis | camelCase | `adicionarItem` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITENS_CARRINHO` |

---

## 3. Introdução ao Next.js

### O que é Next.js?

Next.js é um **framework React** criado pela Vercel que adiciona funcionalidades que o React por si só não oferece: roteamento baseado em arquivos, renderização no servidor, geração estática, otimização de imagens e muito mais.

Se React é a biblioteca para construir interfaces, Next.js é a estrutura que transforma isso em uma aplicação web completa e pronta para produção.

### Por que ir além do React puro?

| Problema com React puro (SPA) | Solução no Next.js |
|---|---|
| SEO ruim — conteúdo renderizado só no cliente | Server-side rendering (SSR) |
| Tempo até o primeiro conteúdo visível (FCP) alto | Pre-rendering (SSR e SSG) |
| Roteamento manual com React Router | File-based routing nativo |
| Sem backend — precisa de servidor separado | API Routes integradas |
| Otimização de imagens manual | Componente `<Image>` otimizado |

### File-based Routing

Em Next.js, a estrutura de arquivos **é** a estrutura de rotas. Não há configuração de rotas:

```
app/
├── page.jsx          → /
├── sobre/
│   └── page.jsx      → /sobre
├── produto/
│   ├── page.jsx      → /produto
│   └── [id]/
│       └── page.jsx  → /produto/42, /produto/99, ...
└── blog/
    └── [slug]/
        └── page.jsx  → /blog/meu-post
```

```jsx
// app/produto/[id]/page.jsx
export default function PaginaProduto({ params }) {
  return <h1>Produto {params.id}</h1>;
}
```

### Estratégias de renderização

Esta é a grande diferença do Next.js. Você pode escolher **por página** como o conteúdo é gerado:

#### SSG — Static Site Generation

O HTML é gerado **em tempo de build**. Ideal para conteúdo que não muda com frequência (blog, landing pages, documentação).

```jsx
// Gerado uma vez no build, servido como HTML estático
export default async function Blog() {
  const posts = await buscarPosts(); // executa no build
  return <ListaDePosts posts={posts} />;
}
```

#### SSR — Server-Side Rendering

O HTML é gerado **a cada requisição** no servidor. Ideal para conteúdo dinâmico que depende do usuário ou de dados em tempo real.

```jsx
// Executado no servidor a cada requisição
export default async function Dashboard() {
  const dados = await buscarDadosDoUsuario(); // executa no servidor, por requisição
  return <GraficoDeDados dados={dados} />;
}
```

#### CSR — Client-Side Rendering

O conteúdo é carregado no cliente, como no React tradicional. Usado para partes interativas que não precisam de SEO.

```jsx
'use client'; // diretiva que marca o componente como client-side

import { useState, useEffect } from 'react';

export default function Comentarios({ postId }) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(`/api/comentarios?post=${postId}`)
      .then(r => r.json())
      .then(setComentarios);
  }, [postId]);

  return <Lista itens={comentarios} />;
}
```

### Server Components vs Client Components

O App Router do Next.js (versão 13+) introduz uma distinção fundamental:

| | Server Component | Client Component |
|---|---|---|
| **Padrão?** | Sim | Não — precisa de `'use client'` |
| **Acessa banco de dados?** | Sim, diretamente | Não |
| **Usa hooks (useState, useEffect)?** | Não | Sim |
| **Bundle enviado ao cliente?** | Não | Sim |
| **Boa para** | Busca de dados, SEO, performance | Interatividade, eventos, estado |

```jsx
// Server Component (padrão) — busca dados diretamente
async function ListaProdutos() {
  const produtos = await db.produtos.findMany(); // acesso direto ao banco!
  return (
    <ul>
      {produtos.map(p => (
        <ItemProduto key={p.id} produto={p} />
      ))}
    </ul>
  );
}
```

```jsx
'use client';
// Client Component — necessário para interatividade
function ItemProduto({ produto }) {
  const [adicionado, setAdicionado] = useState(false);
  return (
    <li>
      {produto.nome}
      <button onClick={() => setAdicionado(true)}>
        {adicionado ? 'No carrinho!' : 'Adicionar'}
      </button>
    </li>
  );
}
```

### API Routes

Next.js permite criar endpoints de API dentro do próprio projeto, sem precisar de um servidor separado:

```
app/
└── api/
    └── produtos/
        ├── route.js         → GET /api/produtos, POST /api/produtos
        └── [id]/
            └── route.js     → GET /api/produtos/42
```

```javascript
// app/api/produtos/route.js
export async function GET() {
  const produtos = await buscarProdutos();
  return Response.json(produtos);
}

export async function POST(request) {
  const body = await request.json();
  const novoProduto = await criarProduto(body);
  return Response.json(novoProduto, { status: 201 });
}
```

### Next.js e Micro Frontends

Next.js tem suporte nativo ao **Webpack Module Federation** via o pacote `@module-federation/nextjs-mf`, que permite que times exponham e consumam componentes de repositórios diferentes em runtime — sem recompilar.

```
Time A (Next.js) expõe:   → Header, Footer
Time B (Next.js) consome: ← Header de Time A em runtime
```

Isso combina a autonomia dos micro frontends com a produtividade do Next.js.

---

## 4. Referências

### Livros

- BANKS, Alex; PORCELLO, Eve. **Learning React — Modern Patterns for Developing React Apps.** 2ª ed. O'Reilly.
- VESSELOV, Sarrah; DAVIS, Taurie. **Building Design Systems.** Apress.
- GEERS, Michael. **Micro Frontends in Action.** Manning.
- GRIGORIK, Ilya. **High Performance Browser Networking.** O'Reilly.
- PINHO, Diego Martins. **ECMAScript 6.** Casa do Código.

### Links

- https://nextjs.org/docs — Documentação oficial do Next.js
- https://react.dev — Documentação oficial do React (nova)
- https://developer.mozilla.org/ — MDN Web Docs
- https://javascript.info/ — The Modern JavaScript Tutorial
- https://css-tricks.com/ — CSS-Tricks
- https://www.w3c.br/ — W3C Brasil
