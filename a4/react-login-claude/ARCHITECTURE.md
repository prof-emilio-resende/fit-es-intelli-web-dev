# Arquitetura do Projeto — React Login App

## Stack

- **Vite** como bundler/dev server
- **React 18** com JSX
- **React Router v6** para navegação

## Rotas

| Rota       | Componente    | Descrição                        |
|------------|---------------|----------------------------------|
| `/login`   | `LoginPage`   | Tela de login com credenciais fixas |
| `/welcome` | `WelcomePage` | Tela de boas-vindas minimalista  |
| `/`        | Redirect      | Redireciona para `/login`        |

## Autenticação

- Estado gerenciado via **React Context** (`AuthContext`) + `useState`
- Credenciais fixas: `usuario = 'admin'`, `senha = '1234'`
- Rota `/welcome` é protegida — redireciona para `/login` se não autenticado

## Estrutura de Diretórios

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Router setup
├── context/
│   └── AuthContext.jsx   # Context de autenticação
├── pages/
│   ├── LoginPage.jsx     # Página de login
│   └── WelcomePage.jsx   # Página de boas-vindas
├── components/
│   └── ProtectedRoute.jsx # Wrapper de rota protegida
└── styles/
    └── App.css           # Estilos globais minimalistas
```

## Decisões

1. **Vite + React** — setup rápido, HMR eficiente
2. **React Router v6** — API moderna com `<Routes>` e `<Route>`
3. **Context simples** — sem necessidade de Redux para este escopo
4. **Credenciais fixas no AuthContext** — sem backend, validação local
5. **CSS puro** — minimalismo, sem dependências extras de UI
