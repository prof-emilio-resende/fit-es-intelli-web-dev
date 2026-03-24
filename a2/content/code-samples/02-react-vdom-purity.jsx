// Exemplo 2: Purity, Effects e Refs no React

import { useState, useEffect, useRef } from "react";

// --- PURITY ---
// Componente puro: mesmas props => mesmo resultado, sem efeitos colaterais
function ContadorPuro({ valor, incremento }) {
  // Nao modifica nada externo, nao tem estado proprio
  return (
    <p>
      Valor: {valor} | Proximo: {valor + incremento}
    </p>
  );
}

// Componente IMPURO (evitar): modifica variavel externa durante render
let contadorExterno = 0;
function ComponenteImpuro() {
  contadorExterno++; // efeito colateral no render — problema!
  return <p>Renders: {contadorExterno}</p>;
}

// --- EFFECTS ---
// useEffect: codigo que "toca" partes externas (API, timers, DOM nativo)
function RelogioComEffect() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    // cleanup: cancela o intervalo ao desmontar o componente
    return () => clearInterval(intervalo);
  }, []); // [] = roda so na montagem

  return <p>Hora atual: {hora}</p>;
}

// --- REFS ---
// useRef: acesso direto ao elemento DOM nativo sem re-render
function InputComFoco() {
  const inputRef = useRef(null);

  function focarInput() {
    inputRef.current.focus(); // acesso direto ao DOM
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Clique no botao..." />
      <button onClick={focarInput}>Focar</button>
    </div>
  );
}

export { ContadorPuro, RelogioComEffect, InputComFoco };
