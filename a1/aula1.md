# Intelligent Web Development
## Aula 1: Fundamentos e Ferramentas

**Faculdade Impacta · Pós-Graduação em Engenharia de Software**
**Prof. Emilio Murta Resende** · emilio.resende@impacta.com.br

---

> ### 📌 Como usar este material
> Este material foi pensado para ser lido **junto com a aula**, não depois. Cada seção acompanha um momento da discussão. Os blocos em destaque são pontos que merecem pausa e reflexão. Os blocos de código são para copiar e experimentar.

---

## Índice

1. [A Disciplina — Visão Geral](#1-a-disciplina--visão-geral)
2. [Por que "Intelligent" Web Development?](#2-por-que-intelligent-web-development)
3. [O Ecossistema JavaScript](#3-o-ecossistema-javascript)
4. [Como o Browser Funciona por Dentro](#4-como-o-browser-funciona-por-dentro)
5. [O Mapa da Web Moderna](#5-o-mapa-da-web-moderna)
6. [State Management — Introdução](#6-state-management--introdução)
7. [Ferramentas Essenciais em 2025](#7-ferramentas-essenciais-em-2025)
8. [Hands-On — Desafio da Aula 1](#8-hands-on--desafio-da-aula-1)
9. [Referências e Leituras Recomendadas](#9-referências-e-leituras-recomendadas)

---

## 1. A Disciplina — Visão Geral

Esta é uma disciplina de **pós-graduação em Engenharia de Software** com foco no desenvolvimento web moderno integrado à **Inteligência Artificial**. Ao longo de 4 aulas, percorreremos o stack completo — dos fundamentos do JavaScript até a construção de interfaces conversacionais com agentes autônomos.

### Roadmap das 4 Aulas

| Aula | Tema Central | O que você vai aprender |
|------|-------------|------------------------|
| **Aula 1** ← *você está aqui* | Fundamentos & Ferramentas | Ecossistema JS, browser internals, SPA · SSR · SSG · PWA · Micro-frontends |
| **Aula 2** | Design & React | Design responsivo, React do básico ao avançado, State Management na prática |
| **Aula 3** | Arquitetura & Soluções | PWA avançado, SSR com Next.js, desenho de soluções web com exemplos reais |
| **Aula 4** | IA & Multiagentes | Chat inteligente com React + IA, Claude Swarm, GitHub Copilot Agents |

> **💡 Nota** — As aulas são cumulativas. Os conceitos de hoje são a base para tudo que vem depois. A Aula 4 — onde vamos construir um chat com IA — depende do que aprenderemos nas aulas 1, 2 e 3.

---

## 2. Por que "Intelligent" Web Development?

A web não é mais o que era. Em menos de uma década, o front-end passou de páginas estáticas com jQuery para aplicações ricas com React — e agora está incorporando **Inteligência Artificial generativa** como parte nativa do stack.

### A Evolução em 3 momentos

```
2012- ─────── HTML + CSS + jQuery
                  "Fazer a página funcionar"

2013 ──────── Ênfase em frontend enquanto disciplina de desenvolvimento de software
                  "Frontend profissional, com ciclo de vida e cadência próprios

2020 ──────── SPAs com React, Vue, Angular
                  "Construir aplicações ricas no cliente"

2025 ──────── IA generativa integrada ao stack
                  "Construir experiências inteligentes"
```

### O que mudou na prática

- **Interfaces conversacionais** — chats inteligentes substituem formulários tradicionais, tornando a UX mais natural e eficiente
- **Copilots de código** — ferramentas como GitHub Copilot geram 40–60% do código em projetos modernos; saber prompting é tão importante quanto saber sintaxe
- **Agentes autônomos** — front-ends que orquestram tarefas complexas, chamam múltiplas APIs e tomam decisões sem intervenção humana
- **LLMs no browser** — modelos de linguagem respondendo em tempo real diretamente na interface, via streaming de tokens

> **⚠️ Atenção** — Não estamos falando de uma tendência futura. Empresas como Nubank, iFood, Mercado Livre e todas as big techs já têm times dedicados à integração de IA no front-end. Isso é o mercado de trabalho **agora**.

---

## 3. O Ecossistema JavaScript

JavaScript é, sem exagero, a linguagem mais importante da web. É a **única linguagem que roda nativamente no browser** — e hoje também roda no servidor (Node.js), em funções de edge (Cloudflare Workers) e é a base de todos os frameworks modernos.

### Por que JS ainda é fundamental

- **Ubiquidade** — todo browser do mundo executa JavaScript; não há alternativa nativa
- **Versatilidade** — roda no cliente, no servidor, na edge, em apps mobile (React Native) e até em microcontroladores
- **Ecossistema** — npm tem mais de 2 milhões de pacotes; nenhum outro ecossistema chega perto
- **Evolução contínua** — o ECMA TC39 lança novas features anualmente (ES2024, ES2025...)

> **📖 Para ler** — `https://javascript.info` é o melhor guia gratuito de JavaScript moderno. Recomendado como leitura de referência durante toda a disciplina.

---

### 3.1 JavaScript + Orientação a Objetos

JS é uma linguagem **multiparadigma** — suporta orientação a objetos, programação funcional e procedural. Mas sua OOP é diferente das linguagens clássicas: é baseada em **Prototype**, não em classes de verdade.

- A palavra-chave `class` (introduzida no ES6) é apenas **açúcar sintático** sobre prototypes — por baixo, tudo continua funcionando da mesma forma
- Todo objeto em JS aponta para um **protótipo** — uma cadeia que vai até `Object.prototype`
- Isso é chamado de **prototype chain** — o mecanismo de herança do JS

```js
// Prototype chain em ação
const arr = [1, 2, 3];
arr.map(x => x * 2); // de onde vem .map()?
// Resposta: de Array.prototype.map — herdado via prototype chain
```

#### O poder do `this`

`this` é uma das features mais mal compreendidas do JavaScript. Seu valor **depende de como a função é chamada**, não de onde ela foi definida:

```js
const obj = {
  nome: 'Emilio',
  saudar: function() {
    console.log(`Olá, ${this.nome}`); // this = obj
  },
  saudarArrow: () => {
    console.log(`Olá, ${this.nome}`); // this = escopo externo (undefined em strict mode)
  }
};

obj.saudar();       // "Olá, Emilio"
obj.saudarArrow();  // "Olá, undefined"
```

> **💡 Dica prática** — Arrow functions (`=>`) **não têm seu próprio `this`** — herdam o `this` do escopo onde foram definidas. Por isso são preferidas em callbacks e em componentes React.

---

### 3.2 Closures — O coração dos React Hooks

Uma **closure** é uma função que lembra o escopo onde foi criada, mesmo após esse escopo ter encerrado. É um dos conceitos mais poderosos — e mais mal compreendidos — do JavaScript.

```js
function contador() {
  let count = 0; // esta variável "sobrevive" fora da função

  return function incrementar() {
    count++;
    return count;
  };
}

const inc = contador(); // contador() já terminou de executar
inc(); // → 1  ← mas count ainda existe!
inc(); // → 2
inc(); // → 3
```

**Por que isso importa para React?**

O `useState` do React é implementado usando closures. Quando você escreve:

```js
const [count, setCount] = useState(0);
```

Por baixo dos panos, o React está usando um mecanismo de closure para "lembrar" o valor de `count` entre renderizações. Na Aula 2, veremos isso em profundidade.

> ### 🎯 Conceito-chave: Closures
> Uma closure ocorre quando uma função **"fecha sobre"** variáveis do seu escopo externo, mantendo acesso a elas mesmo depois que o escopo original foi destruído.
>
> **Escopo léxico** = variáveis são resolvidas no escopo onde foram *definidas*, não onde são *chamadas*.

---

### 3.3 JavaScript + DOM e Eventos

O **DOM (Document Object Model)** é a representação do HTML como uma árvore de objetos em memória. É através do DOM que o JavaScript consegue ler e modificar qualquer parte da página.

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1 ("Intelligent Web Dev")
        ├── p  ("Aula 1...")
        └── ul
            ├── li
            └── li
```

#### Manipulando o DOM

```js
// Selecionando elementos
const titulo = document.querySelector('h1');
const items  = document.querySelectorAll('li');

// Modificando
titulo.textContent = 'Novo título';
titulo.style.color = 'purple';

// Criando elementos
const novoItem = document.createElement('li');
novoItem.textContent = 'Item criado via JS';
document.querySelector('ul').appendChild(novoItem);
```

#### Eventos — o EventObject

Quando um evento acontece (clique, tecla, resize...), o browser cria um objeto com informações sobre o evento:

| Propriedade | Descrição | Exemplo de uso |
|-------------|-----------|----------------|
| `event.target` | Elemento que disparou o evento | Saber qual botão foi clicado |
| `event.keyCode` | Código da tecla pressionada | Detectar Enter, Esc... |
| `event.clientX/Y` | Coordenadas do clique | Interfaces de drag-and-drop |
| `event.preventDefault()` | Cancela comportamento padrão | Impedir submit de formulário |

```js
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // impede o reload da página
  const dados = new FormData(event.target);
  console.log(Object.fromEntries(dados));
});
```

> **💡 Nota** — O React abstrai toda essa manipulação de eventos com seu sistema de **Synthetic Events**. Mas entender o DOM nativo é essencial quando você precisar depurar comportamentos inesperados — e isso vai acontecer.

---

### 3.4 JavaScript Assíncrono — XHR, Fetch e Async/Await

A web é fundamentalmente assíncrona. Requisições HTTP demoram — milissegundos ou segundos — e o JavaScript não pode simplesmente travar esperando a resposta. A evolução do assincronismo em JS foi longa:

```
XMLHttpRequest (XHR)     →  jQuery.ajax()  →  Promises  →  async/await
     ~2000                    ~2006            ES6/2015      ES2017
```

#### O padrão moderno: fetch + async/await

```js
// Forma moderna — legível, sem callback hell
async function buscarUsuario(id) {
  try {
    const response = await fetch(`https://api.exemplo.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const usuario = await response.json();
    return usuario;

  } catch (error) {
    console.error('Falha ao buscar usuário:', error.message);
    throw error; // re-lança para quem chamou tratar
  }
}

// Uso
const user = await buscarUsuario(42);
console.log(user.nome);
```

#### O legado: XHR e seus readyStates

Você vai encontrar XHR em código legado. Os estados da requisição:

| readyState | Significado |
|-----------|-------------|
| `1` | Conexão inicializada com o servidor |
| `2` | Requisição enviada e sendo processada |
| `3` | Recebendo dados do servidor |
| `4` | ✅ Resposta completa recebida |

> ### 🔗 Conexão com a Aula 4
> Na última aula, usaremos `fetch` com **streaming de tokens** para criar um chat que exibe a resposta da IA palavra por palavra — exatamente como o ChatGPT. A base técnica é a Fetch API com `ReadableStream`. Guarde esse conceito.

---

## 4. Como o Browser Funciona por Dentro

Entender o que acontece entre digitar uma URL e ver a página na tela é fundamental para qualquer dev front-end sério. Esse conhecimento explica **por que o React existe**, por que certas animações são lentas e como escrever CSS performático.

### 4.1 O Pipeline de Renderização

```
1. CARREGA       HTML → HTML Parser → DOM Tree
                 CSS  → CSS Parser  → CSSOM

2. CONSTRÓI      DOM Tree + CSSOM → Render Tree
                 (apenas elementos visíveis)

3. LAYOUT        Calcula posição e tamanho de cada elemento
                 (chamado também de "reflow")

4. PAINT         Desenha pixels na tela
                 (chamado também de "repaint")

5. COMPOSITE     GPU monta as camadas e exibe ao usuário
```

### 4.2 Por que isso importa para o dev?

**Reflow é caro.** Sempre que você muda propriedades que afetam o layout (`width`, `height`, `margin`, `padding`, `font-size`...), o browser precisa recalcular as posições de **todos os elementos afetados** e repintar. Em páginas complexas, isso pode travar a UI.

**Por isso o React usa Virtual DOM:**
- O React mantém uma cópia do DOM em memória (o "Virtual DOM")
- Quando o estado muda, ele calcula o mínimo de alterações necessárias
- Só então aplica essas mudanças no DOM real — minimizando reflows

**Animações performáticas:**

```css
/* ❌ Ruim — causa reflow a cada frame */
.box { animation: mover 1s; }
@keyframes mover { to { left: 200px; } }

/* ✅ Bom — roda na GPU, sem reflow */
.box { animation: mover 1s; }
@keyframes mover { to { transform: translateX(200px); } }
```

> **🎯 Regra de ouro** — `transform` e `opacity` são as duas propriedades CSS que o browser pode animar **sem acionar Layout ou Paint** — elas rodam diretamente na GPU via Compositor. Use-as sempre que possível em animações.

---

## 5. O Mapa da Web Moderna

Existe um "zoológico" de siglas e paradigmas no desenvolvimento web moderno. Vamos entender cada um — porque em entrevistas e em decisões arquiteturais, você vai precisar explicar as diferenças.

> **⚠️ Aviso importante** — Não existe bala de prata. Cada paradigma tem seu contexto de uso ideal. O erro mais comum de devs inexperientes é escolher a tecnologia "favorita" sem analisar o problema.

---

### 5.1 SPA — Single Page Application

**O que é:** Uma única página HTML é carregada uma vez pelo browser. A partir daí, toda a navegação e atualização de conteúdo acontece **sem recarregar a página** — o JavaScript manipula o DOM dinamicamente.

**Como funciona:**

```
1. Browser requisita → Servidor entrega index.html (vazio)
2. index.html carrega o bundle JS (React, etc.)
3. React "monta" a interface no browser
4. Usuário clica em "Sobre" → React Router troca o componente
5. Novos dados → fetch() para a API → atualiza só o necessário
```

**Quando usar SPA:**
- Aplicações com muita interação do usuário (dashboards, editores, ferramentas)
- Quando SEO não é crítico (aplicações internas, sistemas autenticados)
- Quando você precisa de experiência de "app nativo" no browser

**Quando NÃO usar SPA pura:**
- Sites de conteúdo público que precisam de indexação (blogs, e-commerce, portais)
- Primeira carga rápida é mais importante que navegação fluida

| ✅ Vantagens | ⚠️ Desvantagens |
|-------------|----------------|
| UX fluida, sensação de app nativo | SEO limitado — conteúdo gerado em JS |
| Separação total front/back via API | Bundle inicial pode ser pesado |
| Fácil de reutilizar em mobile (React Native) | Precisa de estratégias de code splitting |

> **💡 Exemplo real** — Abra o Gmail. Digite algo, clique em uma conversa, mude de aba. A URL muda — mas a página **nunca recarrega**. Isso é uma SPA em produção.

---

### 5.2 SSR — Server-Side Rendering

**O que é:** O HTML é gerado **no servidor** a cada requisição, com os dados já incluídos. O browser recebe uma página completa e pronta para exibir — sem precisar executar JavaScript primeiro.

**O problema que SSR resolve:**

Em uma SPA pura, o Google vê isso ao indexar:
```html
<div id="root"></div> <!-- vazio! O conteúdo só aparece depois que o JS executa -->
```

Com SSR, o Google vê o conteúdo real:
```html
<h1>iPhone 15 Pro — R$ 8.999</h1>
<p>Em estoque. Frete grátis...</p>
```

**Hydration — o processo mágico:**

Após o HTML carregado pelo servidor, o React "hidrata" a página — conecta os event listeners aos elementos HTML sem precisar recriá-los. O resultado é uma página que carrega rápido **e** é interativa.

```js
// Next.js App Router — componente de servidor
// Este código roda no servidor, não no browser
export default async function PaginaProduto({ params }) {
  // Acesso direto ao banco de dados — sem expor ao cliente
  const produto = await db.produto.findById(params.id);

  return (
    <div>
      <h1>{produto.nome}</h1>
      <p>R$ {produto.preco}</p>
      <BotaoComprar id={produto.id} /> {/* componente cliente */}
    </div>
  );
}
```

**Quando usar SSR:**
- E-commerce (SEO + personalização por usuário)
- Portais de notícias e blogs (SEO crítico)
- Dashboards com dados em tempo real
- Qualquer página onde o **First Contentful Paint (FCP)** importa

---

### 5.3 SSG — Static Site Generation

**O que é:** As páginas são geradas **em tempo de build** — antes de qualquer usuário acessar. Os arquivos HTML estáticos são distribuídos via CDN e entregues com latência mínima.

**A diferença fundamental:**

```
SSR:  Usuário acessa → Servidor gera HTML → Entrega
SSG:  npm run build  → Servidor gera HTML → Guarda no CDN
      Usuário acessa → CDN entrega HTML   (instantâneo)
```

**Quando usar SSG:**
- Documentação técnica (este guia poderia ser SSG!)
- Blogs e sites de conteúdo que mudam raramente
- Landing pages e sites institucionais
- Qualquer site onde o conteúdo não é personalizado por usuário

**ISR — Incremental Static Regeneration:**

O Next.js introduziu um híbrido poderoso — páginas estáticas que se **atualizam em background** sem precisar de um rebuild completo:

```js
export const revalidate = 3600; // regenera a página a cada 1 hora
```

> **💡 Analogia** — SSG é como imprimir um livro. Uma vez impresso, é rápido de distribuir. Mas para mudar uma palavra, você precisa reimprimir. ISR é como um jornal digital — você imprime uma edição, mas já está preparando a próxima em background.

---

### 5.4 PWA — Progressive Web Apps

**O que é:** Uma aplicação web que usa APIs modernas do browser para se comportar como um **app nativo** — pode ser instalada na tela inicial, funciona offline e recebe push notifications.

**Os 3 pilares:**

```
┌─────────────────────────────────────────────┐
│               Web App Manifest              │
│  Define ícone, nome, cor, orientação...     │
├─────────────────────────────────────────────┤
│               Service Worker               │
│  Thread em background que intercepta       │
│  requisições de rede e gerencia cache      │
├─────────────────────────────────────────────┤
│                   HTTPS                    │
│  Obrigatório para Service Worker funcionar │
└─────────────────────────────────────────────┘
```

**Como o Service Worker funciona:**

```js
// sw.js — roda em background, separado da página
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Tem no cache? Retorna do cache (offline funciona!)
      if (cachedResponse) return cachedResponse;

      // 2. Não tem? Busca na rede e salva no cache
      return fetch(event.request).then((response) => {
        caches.open('v1').then((cache) => cache.put(event.request, response.clone()));
        return response;
      });
    })
  );
});
```

> **💡 Experimente agora** — Acesse `twitter.com` ou `spotify.com` no Chrome. Veja o ícone de instalação na barra de endereço. Clique em "Instalar aplicativo". Isso é uma PWA sendo instalada como se fosse um app nativo.

---

### 5.5 Micro-frontends

**O que é:** A aplicação front-end é dividida em **módulos independentes**, cada um owneado por um time diferente, com deploys e tecnologias independentes. É o equivalente de microsserviços para o front-end.

**O problema que resolve:**

Imagine uma aplicação como a do Nubank. Existem times para:
- Cartão de crédito
- Conta corrente
- Investimentos
- Empréstimos
- Área do cliente

Se tudo estiver num único repositório (monolito front-end), **um deploy de "Investimentos" pode quebrar o "Cartão"**. Times brigam por merge requests. Testes demoram horas. O bundle fica enorme.

**As abordagens:**

| Abordagem | Como funciona | Prós | Contras |
|-----------|--------------|------|---------|
| **Module Federation** (Webpack 5) | Módulos JS carregados em runtime via URL remota | Times totalmente independentes | Complexidade de configuração |
| **iframes** | Cada MFE roda em um iframe isolado | Isolamento total | Performance ruim, UX prejudicada |
| **Web Components** | Custom elements nativos do browser | Agnóstico de framework | Menos maturidade de ferramental |
| **single-spa** | Orquestrador que monta/desmonta SPAs | Migração incremental | Boilerplate alto |

> **⚠️ Cuidado com o hype** — Micro-frontends aumentam significativamente a **complexidade operacional**. Só fazem sentido quando você tem 5 ou mais squads de front-end trabalhando em paralelo no mesmo produto. Para times menores, um **monorepo bem modularizado** (Nx, Turborepo) resolve o problema com muito menos custo.

---

### 5.6 Isomorphic / Universal Apps

**O que é:** O mesmo código JavaScript roda tanto no servidor quanto no cliente. Na primeira visita, a página é gerada no servidor (SSR). A partir daí, a navegação acontece no cliente (SPA).

É o **melhor dos dois mundos**: FCP rápido + SEO + UX fluida.

```
1ª visita:   URL → Servidor → React renderiza HTML → Browser exibe
                              ↓ (enquanto exibe)
                              JS bundle carrega em background
                              React hidrata a página
                              → Agora é uma SPA

Navegações:  React Router → Troca de componente no cliente
             (sem bater no servidor, sem reload)
```

O **Next.js App Router** vai além do isomórfico tradicional com **React Server Components** — componentes que rodam exclusivamente no servidor, sem enviar nenhum JavaScript para o cliente. O resultado é aplicações mais rápidas e bundles menores.

---

## 6. State Management — Introdução

**Estado (state)** é toda informação que pode mudar ao longo do tempo e que afeta o que é exibido na tela. Gerenciar estado é **o problema central** do desenvolvimento front-end moderno.

### Os 3 tipos de estado

```
LOCAL          ─── Vive dentro de um componente
                   Ex: o drawer está aberto ou fechado?
                   Solução: useState

COMPARTILHADO  ─── Precisa ser acessado por componentes "irmãos"
                   Ex: o filtro selecionado afeta a lista abaixo
                   Solução: "lifting state up" (elevar o estado)

GLOBAL         ─── Precisa ser acessado em qualquer lugar da app
                   Ex: usuário autenticado, tema, carrinho de compras
                   Solução: Context API, Redux, Zustand
```

### Por que é difícil?

Imagine um e-commerce com:
- Header exibindo o número de itens no carrinho
- Página de produto com botão "Adicionar ao carrinho"
- Sidebar mostrando os últimos itens adicionados

Todos precisam do **mesmo dado** (o carrinho). Quando o usuário adiciona um item, os 3 precisam atualizar **instantaneamente**. Se cada um guardar sua própria cópia do carrinho, eles vão desincronizar.

> **💡 Analogia** — Pense no placar de um jogo de futebol num estádio. Todos na torcida (componentes) precisam ver o mesmo número. Se cada pessoa tivesse seu próprio placar e tivesse que atualizá-lo manualmente, o caos seria inevitável. O estado global é o **placar único que todos consultam**.

### Preview — Aula 2

Na próxima aula, implementaremos as principais soluções de state management e aprofundaremos o **consumo de APIs REST** — como estruturar chamadas, tratar erros, lidar com loading states e sincronizar dados remotos com o estado local da aplicação:

- **Context API** — solução nativa do React para estado global simples
- **Zustand** — alternativa moderna e minimalista para gerenciamento de estado
- **Consumo de APIs REST** — padrões de fetch em componentes React, tratamento de ciclo de vida assíncrono com Hooks

---

## 7. Ferramentas Essenciais em 2025

### Ambiente de Desenvolvimento

- **Node.js (v24 LTS)** — runtime JavaScript fora do browser; necessário para rodar ferramentas de build
- **pnpm** — gerenciador de pacotes mais eficiente que npm (disco, velocidade)
- **Vite** — bundler ultrarrápido que substituiu o Create React App; HMR instantâneo
- **VS Code** — editor com suporte nativo a TypeScript, JSX, debug e extensões para React
- **GitHub Copilot** — IA integrada ao editor; veremos em profundidade na Aula 4

### Deploy e Infraestrutura

- **Vercel** — plataforma de deploy criada pelos autores do Next.js; suporta SPA, SSR e Edge Functions
- **Netlify** — alternativa popular para SSG e SPAs; CI/CD automático via Git
- **Cloudflare Pages** — CDN global com Edge Functions; performance excepcional
- **Surge.sh** — deploy de sites estáticos em segundos via CLI

### Qualidade e Testes

- **ESLint + Prettier** — lint e formatação automática de código
- **Vitest / Jest** — testes unitários; Vitest é mais rápido e integrado ao Vite
- **Playwright / Cypress** — testes end-to-end que simulam o usuário real no browser
- **DevTools do Browser** — Elements, Console, Network, Performance, Application

> **📖 Dica** — Aprender a usar o DevTools profundamente é uma das skills mais valorizadas em devs front-end sênior. O painel "Performance" e o "Network" são ouro para debugging e otimização.

---

## 8. Hands-On — Desafio da Aula 1

### O Desafio: Calculadora de IMC

Construa uma aplicação web que calcula o **Índice de Massa Corporal (IMC)** e exibe o resultado com a classificação correta.

**Fórmula:**
```
IMC = Peso (kg) / Altura² (m)
```

**Classificação:**
| Faixa | Classificação |
|-------|--------------|
| IMC < 18,5 | Magreza |
| 18,5 ≤ IMC < 25 | Normal |
| 25 ≤ IMC < 30 | Sobrepeso |
| IMC ≥ 30 | Obesidade |

### Requisitos mínimos

- Interface HTML/CSS com inputs de peso e altura
- Cálculo usando JavaScript com `async/await` e `fetch` (simule uma API local se necessário)
- Exibição da classificação com feedback visual (cores, ícones)

### Requisito bônus ⭐

**Escolha uma das arquiteturas estudadas hoje (SPA, SSR ou SSG) e justifique sua escolha em 3 frases.** A justificativa conta tanto quanto o código.

### Código de partida

```js
// imc.js — ponto de partida

async function calcularIMC(peso, altura) {
  // Em um projeto real, isso seria uma chamada para uma API
  // Aqui, fazemos o cálculo no cliente mesmo
  const imc = peso / (altura ** 2);
  return {
    valor: imc.toFixed(1),
    classificacao: classificar(imc)
  };
}

function classificar(imc) {
  if (imc < 18.5) return { label: 'Magreza',   cor: '#3b82f6' };
  if (imc < 25.0) return { label: 'Normal',     cor: '#22c55e' };
  if (imc < 30.0) return { label: 'Sobrepeso',  cor: '#f59e0b' };
  return              { label: 'Obesidade',  cor: '#ef4444' };
}

// Conectando à interface
document.querySelector('#calcular').addEventListener('click', async () => {
  const peso   = parseFloat(document.querySelector('#peso').value);
  const altura = parseFloat(document.querySelector('#altura').value);

  const resultado = await calcularIMC(peso, altura);

  document.querySelector('#resultado').textContent =
    `IMC: ${resultado.valor} — ${resultado.classificacao.label}`;
});
```

### Tecnologias aceitas

A escolha da tecnologia é livre — o que importa é a clareza do código e a qualidade da justificativa arquitetural:

- **HTML + CSS + JS puro**
- **React com Vite**

> **📅 Prazo** — Entregar antes da Aula 2. Envie o link do deploy + o link do repositório (GitHub).

---

## 9. Referências e Leituras Recomendadas

### Livros da Disciplina

| Livro | Autor(es) | Editora | Para quando |
|-------|-----------|---------|-------------|
| **HTML5 e CSS3** | Lucas Mazza | Casa do Código | Antes da Aula 1 |
| **Desconstruindo a Web** | Willian Molinari | Casa do Código | Antes da Aula 1 |
| **ECMAScript 6** | Diego Martins de Pinho | Casa do Código | Antes da Aula 2 |
| **Learning React** | Banks & Porcello | O'Reilly | Antes da Aula 2 |

### Documentação Essencial (sempre aberta no browser)

- **`developer.mozilla.org`** — MDN Web Docs; a referência definitiva de HTML, CSS e JS
- **`javascript.info`** — o melhor guia moderno de JavaScript; gratuito e completo
- **`react.dev`** — documentação oficial do React com Hooks; recentemente reescrita
- **`nextjs.org/docs`** — documentação do Next.js; App Router é o futuro
- **`docs.anthropic.com`** — API da Anthropic; usaremos na Aula 4

### Blogs e Pessoas para Seguir

- **Addy Osmani** — performance web, Chrome team (Google)
- **Dan Abramov** — co-criador do Redux e React Hooks
- **Wes Bos** — tutoriais práticos de JavaScript moderno
- **Theo (t3.gg)** (YouTube) — arquitetura web moderna, TypeScript, Next.js

### Links Úteis

- **`web.dev`** — guias de performance, PWA e boas práticas (Google)
- **`css-tricks.com`** — referência de CSS, Flexbox, Grid
- **`caniuse.com`** — compatibilidade de features CSS/JS entre browsers
- **`bundlephobia.com`** — custo de adicionar um pacote npm ao seu bundle

---

*Intelligent Web Development — Faculdade Impacta · Pós-Graduação em Engenharia de Software*
*© Prof. Emilio Murta Resende — Material de uso exclusivo dos alunos*
