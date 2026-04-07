# Next.js 16 — Crash Course

> Aula prática em vídeo. Cada seção é um passo; execute os comandos no terminal conforme avançamos.

---

## 1. Criando o projeto

```bash
npx create-next-app@latest meu-app
```

Responda as perguntas assim:

| Pergunta | Resposta |
|---|---|
| TypeScript? | Yes |
| ESLint? | Yes |
| Tailwind CSS? | Yes |
| `src/` directory? | No |
| App Router? | Yes |
| Turbopack for dev? | No |
| Import alias? | Yes (`@/*`) |

```bash
cd meu-app
npm run dev
```

Abra `http://localhost:3000` — você verá a tela de boas-vindas do Next.js.

**Estrutura que importa:**

```
meu-app/
├── app/
│   ├── layout.tsx   ← layout raiz (HTML, body)
│   ├── page.tsx     ← rota "/"
│   └── globals.css
├── public/
├── next.config.ts
└── package.json
```

> **Regra de ouro:** cada pasta dentro de `app/` com um arquivo `page.tsx` vira uma rota. `app/sobre/page.tsx` → `/sobre`.

---

## 2. Primeira página e navegação

Substitua o conteúdo de `app/page.tsx`:

```tsx
// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Início</h1>
      <Link href="/cadastro" className="text-blue-600 underline">
        Ir para Cadastro
      </Link>
    </main>
  )
}
```

Crie a pasta e o arquivo da segunda rota:

```bash
mkdir app/cadastro
touch app/cadastro/page.tsx
```

```tsx
// app/cadastro/page.tsx
export default function Cadastro() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Cadastro</h1>
    </main>
  )
}
```

Navegue entre `/` e `/cadastro` no browser.

---

## 3. Formulário com React Hook Form

Instale a biblioteca:

```bash
npm install react-hook-form
```

Crie o componente do formulário. Por usar hooks (`useState`, `useForm`), ele precisa ser um **Client Component** — note o `'use client'` no topo:

```tsx
// app/cadastro/CadastroForm.tsx
'use client'

import { useForm } from 'react-hook-form'

type FormData = {
  nome: string
  email: string
}

export default function CadastroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    console.log('Enviado:', data)
    alert(`Olá, ${data.nome}!`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          {...register('nome', { required: 'Nome obrigatório' })}
          className="border rounded px-3 py-2 w-full"
          placeholder="Seu nome"
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">E-mail</label>
        <input
          {...register('email', {
            required: 'E-mail obrigatório',
            pattern: { value: /\S+@\S+\.\S+/, message: 'E-mail inválido' },
          })}
          className="border rounded px-3 py-2 w-full"
          placeholder="seu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Cadastrar
      </button>

    </form>
  )
}
```

Use o componente na página:

```tsx
// app/cadastro/page.tsx
import CadastroForm from './CadastroForm'

export default function Cadastro() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
      <CadastroForm />
    </main>
  )
}
```

Teste no browser: tente enviar o formulário vazio e veja as mensagens de validação.

> **O que o React Hook Form faz por nós:**
> - `register` conecta o campo ao formulário sem `useState`
> - `handleSubmit` só chama `onSubmit` se todos os campos forem válidos
> - `formState.errors` contém as mensagens de erro

---

## 4. Estado global com Zustand

Instale o Zustand:

```bash
npm install zustand
```

Crie a store:

```tsx
// store/useUserStore.ts
import { create } from 'zustand'

type UserStore = {
  nome: string
  email: string
  setUser: (nome: string, email: string) => void
  clear: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  nome: '',
  email: '',
  setUser: (nome, email) => set({ nome, email }),
  clear: () => set({ nome: '', email: '' }),
}))
```

Atualize o formulário para salvar na store ao enviar:

```tsx
// app/cadastro/CadastroForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { useUserStore } from '@/store/useUserStore'

type FormData = {
  nome: string
  email: string
}

export default function CadastroForm() {
  const setUser = useUserStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit(data: FormData) {
    setUser(data.nome, data.email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-sm">

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          {...register('nome', { required: 'Nome obrigatório' })}
          className="border rounded px-3 py-2 w-full"
          placeholder="Seu nome"
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">E-mail</label>
        <input
          {...register('email', {
            required: 'E-mail obrigatório',
            pattern: { value: /\S+@\S+\.\S+/, message: 'E-mail inválido' },
          })}
          className="border rounded px-3 py-2 w-full"
          placeholder="seu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Cadastrar
      </button>

    </form>
  )
}
```

Agora crie um componente que lê da store e exibe o usuário logado:

```tsx
// app/cadastro/UsuarioLogado.tsx
'use client'

import { useUserStore } from '@/store/useUserStore'

export default function UsuarioLogado() {
  const { nome, email, clear } = useUserStore()

  if (!nome) return null

  return (
    <div className="mt-6 p-4 border rounded bg-green-50 max-w-sm">
      <p className="font-semibold">Cadastrado com sucesso!</p>
      <p className="text-sm text-gray-600">{nome} — {email}</p>
      <button onClick={clear} className="mt-2 text-sm text-red-500 underline">
        Limpar
      </button>
    </div>
  )
}
```

Adicione na página:

```tsx
// app/cadastro/page.tsx
import CadastroForm from './CadastroForm'
import UsuarioLogado from './UsuarioLogado'

export default function Cadastro() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
      <CadastroForm />
      <UsuarioLogado />
    </main>
  )
}
```

Preencha e envie o formulário — o bloco verde aparece instantaneamente sem reload.

> **Por que Zustand?**
> É minimalista: sem Provider, sem boilerplate. A store é um hook. Perfeito para estado global simples (usuário, carrinho, tema).

---

## 5. React Server Component

Por padrão, **todo componente em `app/` é um Server Component** — ele roda no servidor e nunca vai para o bundle do browser.

Vamos criar uma página que busca dados no servidor e os exibe:

```bash
mkdir app/produtos
touch app/produtos/page.tsx
```

```tsx
// app/produtos/page.tsx

// Simula um banco de dados ou API externa
async function getProdutos() {
  // Em produção: await fetch('https://api.exemplo.com/produtos')
  return [
    { id: 1, nome: 'Camiseta', preco: 49.9 },
    { id: 2, nome: 'Calça', preco: 129.9 },
    { id: 3, nome: 'Tênis', preco: 299.9 },
  ]
}

export default async function Produtos() {
  const produtos = await getProdutos()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>
      <ul className="flex flex-col gap-3">
        {produtos.map((p) => (
          <li key={p.id} className="border rounded p-4 flex justify-between max-w-sm">
            <span>{p.nome}</span>
            <span className="font-semibold">R$ {p.preco.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

Adicione o link na home:

```tsx
// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-3">
      <h1 className="text-3xl font-bold mb-4">Início</h1>
      <Link href="/cadastro" className="text-blue-600 underline">Cadastro</Link>
      <Link href="/produtos" className="text-blue-600 underline">Produtos</Link>
    </main>
  )
}
```

Acesse `/produtos`. Abra o DevTools → Network: **nenhum JS é enviado para essa página**. Os dados chegam prontos no HTML.

> **Quando usar Server Component:**
> - Buscar dados (banco, API, filesystem)
> - Renderizar conteúdo estático ou dependente de servidor
> - Componentes que **não precisam** de interatividade (`onClick`, `useState`, etc.)

---

## 6. React Server Action

Server Actions são **funções assíncronas que rodam no servidor**, chamadas diretamente de um formulário ou de um Client Component. Sem precisar criar uma rota de API.

Crie o arquivo da action:

```tsx
// app/actions.ts
'use server'

export async function cadastrarUsuario(formData: FormData) {
  const nome = formData.get('nome') as string
  const email = formData.get('email') as string

  // Aqui poderia ser: await db.insert({ nome, email })
  console.log('[servidor] Novo cadastro:', { nome, email })

  return { ok: true, mensagem: `${nome} cadastrado com sucesso!` }
}
```

Crie uma nova página que usa a action diretamente em um `<form>`:

```bash
mkdir app/cadastro-server
touch app/cadastro-server/page.tsx
```

```tsx
// app/cadastro-server/page.tsx
import { cadastrarUsuario } from '@/app/actions'
import FormFeedback from './FormFeedback'

export default function CadastroServer() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cadastro (Server Action)</h1>

      <form action={cadastrarUsuario} className="flex flex-col gap-4 max-w-sm">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            name="nome"
            required
            className="border rounded px-3 py-2 w-full"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            name="email"
            type="email"
            required
            className="border rounded px-3 py-2 w-full"
            placeholder="seu@email.com"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </main>
  )
}
```

Adicione o link na home e teste. Ao clicar em "Cadastrar", o Next.js chama a função no servidor — veja o `console.log` aparecendo **no terminal**, não no browser.

> **Diferença prática:**
>
> | | Client Component | Server Action |
> |---|---|---|
> | Roda em | Browser | Servidor |
> | `console.log` aparece | DevTools | Terminal |
> | Acessa banco de dados | Não (direto) | Sim |
> | Precisa de API route | Sim | Não |

---

## 7. Resumo do que construímos

```
meu-app/
├── app/
│   ├── page.tsx                  ← Home com links
│   ├── actions.ts                ← Server Actions ('use server')
│   ├── cadastro/
│   │   ├── page.tsx              ← Server Component (layout da página)
│   │   ├── CadastroForm.tsx      ← Client Component (react-hook-form + zustand)
│   │   └── UsuarioLogado.tsx     ← Client Component (lê da store)
│   ├── cadastro-server/
│   │   └── page.tsx              ← Formulário nativo com Server Action
│   └── produtos/
│       └── page.tsx              ← Server Component com fetch assíncrono
└── store/
    └── useUserStore.ts           ← Store Zustand
```

### Conceitos cobertos

| Conceito | Onde vimos |
|---|---|
| Roteamento por pastas | `app/cadastro/page.tsx` → `/cadastro` |
| Client Component (`'use client'`) | `CadastroForm.tsx`, `UsuarioLogado.tsx` |
| Server Component (`async`) | `app/produtos/page.tsx` |
| Server Action (`'use server'`) | `app/actions.ts` |
| React Hook Form | `CadastroForm.tsx` |
| Zustand | `store/useUserStore.ts` |

---

## Próximos passos

- **Middleware** — autenticação, redirecionamentos antes do render
- **Route Handlers** — API routes em `app/api/route.ts`
- **`useOptimistic`** — UI otimista com Server Actions
- **Parallel & Intercepted Routes** — modais e layouts avançados
- **`next/image`** e `next/font` — otimizações built-in
