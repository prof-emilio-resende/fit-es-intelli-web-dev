// Exemplo 9: estado compartilhado simples (padrao store)

function createStore(initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function setState(partial) {
    state = { ...state, ...partial };
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    };
  }

  return { getState, setState, subscribe };
}

const store = createStore({ carrinho: 0, usuario: "anonimo" });

const unsubscribe = store.subscribe((state) => {
  console.log("estado atualizado:", state);
});

store.setState({ usuario: "ana" });
store.setState({ carrinho: 1 });
store.setState({ carrinho: 2 });

unsubscribe();
store.setState({ carrinho: 3 }); // nao dispara mais listener
