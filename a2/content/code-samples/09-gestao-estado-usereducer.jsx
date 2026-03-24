// Exemplo 9: Gestao de Estado Local com useReducer
// Prefira useReducer quando o estado tem logica complexa ou multiplas transicoes

import { useReducer } from "react";

// --- REDUCER: funcao pura que define transicoes de estado ---
// (estado, acao) => novo estado
function carrinhoReducer(state, action) {
  switch (action.type) {
    case "ADICIONAR": {
      const itemExistente = state.itens.find((i) => i.id === action.produto.id);
      if (itemExistente) {
        return {
          ...state,
          itens: state.itens.map((i) =>
            i.id === action.produto.id ? { ...i, qtd: i.qtd + 1 } : i
          ),
        };
      }
      return {
        ...state,
        itens: [...state.itens, { ...action.produto, qtd: 1 }],
      };
    }

    case "REMOVER":
      return {
        ...state,
        itens: state.itens.filter((i) => i.id !== action.id),
      };

    case "ALTERAR_QTD":
      return {
        ...state,
        itens: state.itens.map((i) =>
          i.id === action.id ? { ...i, qtd: Math.max(1, action.qtd) } : i
        ),
      };

    case "LIMPAR":
      return { itens: [] };

    default:
      return state;
  }
}

const estadoInicial = { itens: [] };

// --- COMPONENTE QUE USA O REDUCER ---
function Carrinho() {
  const [state, dispatch] = useReducer(carrinhoReducer, estadoInicial);

  const catalogo = [
    { id: 1, nome: "Teclado Mecanico", preco: 250 },
    { id: 2, nome: "Mouse Gamer",      preco: 150 },
    { id: 3, nome: "Monitor 24\"",     preco: 900 },
  ];

  const total = state.itens.reduce((acc, i) => acc + i.preco * i.qtd, 0);

  return (
    <div>
      <h2>Catalogo</h2>
      {catalogo.map((produto) => (
        <div key={produto.id} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <span>{produto.nome} - R$ {produto.preco}</span>
          <button onClick={() => dispatch({ type: "ADICIONAR", produto })}>
            Adicionar
          </button>
        </div>
      ))}

      <h2>Carrinho ({state.itens.length} items)</h2>
      {state.itens.length === 0 && <p>Carrinho vazio.</p>}
      {state.itens.map((item) => (
        <div key={item.id} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
          <span>{item.nome}</span>
          <input
            type="number"
            value={item.qtd}
            min={1}
            style={{ width: "50px" }}
            onChange={(e) =>
              dispatch({ type: "ALTERAR_QTD", id: item.id, qtd: Number(e.target.value) })
            }
          />
          <span>= R$ {(item.preco * item.qtd).toFixed(2)}</span>
          <button onClick={() => dispatch({ type: "REMOVER", id: item.id })}>
            Remover
          </button>
        </div>
      ))}

      {state.itens.length > 0 && (
        <div>
          <strong>Total: R$ {total.toFixed(2)}</strong>
          <button onClick={() => dispatch({ type: "LIMPAR" })}>Limpar carrinho</button>
        </div>
      )}
    </div>
  );
}

export default Carrinho;

// Quando usar useReducer vs useState:
// useState  => estado simples, poucas transicoes, sem dependencia entre campos
// useReducer => logica complexa, multiplas acoes, proximo ao padrao Redux/Flux
