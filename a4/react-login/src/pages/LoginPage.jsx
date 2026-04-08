import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FIXED_CREDENTIALS = {
  email: 'admin@exemplo.com',
  password: '123456',
}

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValid =
      email.trim().toLowerCase() === FIXED_CREDENTIALS.email &&
      password === FIXED_CREDENTIALS.password

    if (!isValid) {
      setError('Credenciais invalidas. Tente novamente.')
      return
    }

    setError('')
    onLoginSuccess()
    navigate('/welcome')
  }

  return (
    <main className="screen">
      <section className="card" aria-labelledby="login-title">
        <h1 id="login-title">Login</h1>
        <p className="subtitle">Entre com suas credenciais para continuar.</p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
