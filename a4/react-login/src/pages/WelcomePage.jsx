import { Link } from 'react-router-dom'

function WelcomePage() {
  return (
    <main className="screen">
      <section className="card" aria-labelledby="welcome-title">
        <h1 id="welcome-title">Boas-vindas</h1>
        <p className="subtitle">Login realizado com sucesso.</p>
        <Link className="text-link" to="/">
          Voltar para login
        </Link>
      </section>
    </main>
  )
}

export default WelcomePage
