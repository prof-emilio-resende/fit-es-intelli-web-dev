# Design Spec — React Login App (Minimalista)

## Princípios

- **Minimalismo radical**: apenas o essencial na tela, zero decoração supérflua
- **Whitespace generoso**: o espaço vazio é parte ativa do design
- **Uma única ação principal por tela**: foco total na tarefa do usuário

---

## Paleta de Cores

| Token           | Valor     | Uso                        |
|-----------------|-----------|----------------------------|
| Background      | `#FFFFFF` | Fundo de todas as telas    |
| Texto principal | `#1A1A1A` | Títulos, labels, corpo     |
| Accent / CTA    | `#000000` | Botão principal            |
| Erro            | `#D32F2F` | Mensagens de erro          |
| Border inputs   | `#E0E0E0` | Borda dos campos de input  |

---

## Tipografia

- **Font-family**: `'Inter', sans-serif` (fallback: `system-ui, -apple-system, sans-serif`)
- **Tamanhos**:
  - Título: `24px`, weight `600`
  - Label: `14px`, weight `500`
  - Input: `16px`, weight `400`
  - Botão: `14px`, weight `600`, `text-transform: uppercase`, `letter-spacing: 0.5px`

---

## Tela de Login

### Layout
- Centralizado vertical e horizontalmente via **flexbox**
- `min-height: 100vh`
- `max-width: 360px` para o formulário
- Padding interno: `32px`

### Elementos (de cima para baixo)
1. **Título**: "Entrar" — `24px`, `font-weight: 600`, `margin-bottom: 32px`
2. **Campo Usuário**:
   - Label: "Usuário" — `14px`, `margin-bottom: 6px`
   - Input: borda `1px solid #E0E0E0`, `padding: 12px`, `border-radius: 4px`, largura `100%`
3. **Campo Senha**:
   - Label: "Senha" — `14px`, `margin-bottom: 6px`
   - Input: mesmo estilo do campo acima, `type="password"`
   - Espaçamento entre campos: `16px`
4. **Botão CTA**: "Entrar"
   - `background: #000000`, `color: #FFFFFF`
   - `padding: 12px`, `width: 100%`, `border: none`, `border-radius: 4px`
   - `cursor: pointer`
   - `margin-top: 24px`
   - Hover: `background: #2D2D2D`
5. **Mensagem de erro** (condicional):
   - Abaixo do botão, `margin-top: 16px`
   - `color: #D32F2F`, `font-size: 14px`, `text-align: center`

### Interação
- Foco no input: `border-color: #1A1A1A`, `outline: none`
- Estado de loading no botão: texto muda para "Entrando..." e `opacity: 0.7`

---

## Tela de Boas-vindas

### Layout
- Centralizado vertical e horizontalmente via **flexbox**
- `min-height: 100vh`

### Elementos
1. **Texto de boas-vindas**: "Olá, seja bem-vindo." — `24px`, `font-weight: 600`
2. **Botão de logout**: "Sair"
   - `background: none`, `border: none`, `color: #1A1A1A`
   - `font-size: 14px`, `cursor: pointer`, `margin-top: 24px`
   - `text-decoration: underline` (discreto)
   - Hover: `opacity: 0.6`

### Atmosfera
- Muito whitespace — a mensagem e o link flutuam no centro da tela
- Nenhum outro elemento visual

---

## CSS Global (Reset)

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #FFFFFF;
  color: #1A1A1A;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## Resumo Visual

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│           Entrar                │
│                                 │
│     ┌───────────────────┐       │
│     │ Usuário           │       │
│     └───────────────────┘       │
│     ┌───────────────────┐       │
│     │ Senha             │       │
│     └───────────────────┘       │
│                                 │
│     ┌───────────────────┐       │
│     │     ENTRAR        │       │
│     └───────────────────┘       │
│                                 │
│                                 │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│     Olá, seja bem-vindo.        │
│              Sair               │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```
