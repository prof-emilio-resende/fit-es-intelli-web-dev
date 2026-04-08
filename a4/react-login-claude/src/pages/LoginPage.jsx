import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  form: {
    width: '100%',
    maxWidth: '360px',
    padding: '32px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '32px',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 400,
    outline: 'none',
    fontFamily: 'inherit',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#000000',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    marginTop: '24px',
    fontFamily: 'inherit',
  },
  error: {
    marginTop: '16px',
    color: '#D32F2F',
    fontSize: '14px',
    textAlign: 'center',
  },
}

export default function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    setTimeout(() => {
      const success = login(usuario, senha)
      if (success) {
        navigate('/welcome')
      } else {
        setErro('Usuário ou senha incorretos.')
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Entrar</h1>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            style={styles.input}
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#1A1A1A' }}
            onBlur={(e) => { e.target.style.borderColor = '#E0E0E0' }}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="senha">Senha</label>
          <input
            id="senha"
            style={styles.input}
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#1A1A1A' }}
            onBlur={(e) => { e.target.style.borderColor = '#E0E0E0' }}
          />
        </div>

        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
          onMouseEnter={(e) => { if (!loading) e.target.style.background = '#2D2D2D' }}
          onMouseLeave={(e) => { e.target.style.background = '#000000' }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {erro && <p style={styles.error}>{erro}</p>}
      </form>
    </div>
  )
}
