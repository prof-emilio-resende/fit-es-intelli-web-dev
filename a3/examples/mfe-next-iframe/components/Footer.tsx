/*
  Footer via iframe — Micro Frontend com integração client-side.

  O footer roda como um projeto estático completamente independente
  (outro repositório, outro time, outro deploy).
  Esta aplicação Next.js não conhece a implementação do footer —
  apenas sabe onde ele está hospedado.
*/

const FOOTER_URL = process.env.NEXT_PUBLIC_FOOTER_URL ?? 'http://localhost:3001/footer.html'

export default function Footer() {
  return (
    <iframe
      src={FOOTER_URL}
      title="Footer"
      width="100%"
      /*
        Altura fixa correspondente ao conteúdo do footer.
        Em produção pode-se usar postMessage para resize dinâmico.
      */
      height={73}
      style={{ border: 'none', display: 'block' }}
    />
  )
}
