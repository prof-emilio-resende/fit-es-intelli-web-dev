import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#1A1A1A',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '24px',
    textDecoration: 'underline',
    fontFamily: 'inherit',
  },
}

export default function WelcomePage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Olá, seja bem-vindo.</h1>
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={(e) => { e.target.style.opacity = '0.6' }}
        onMouseLeave={(e) => { e.target.style.opacity = '1' }}
      >
        Sair
      </button>
    </div>
  )
}
