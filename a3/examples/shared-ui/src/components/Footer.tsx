/*
  Componente Footer da shared-ui.

  Não depende de Tailwind nem de qualquer framework específico —
  usa apenas CSS inline para ser portável em qualquer projeto
  que instale esta biblioteca.
*/

const styles = {
  footer: {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    padding: '24px',
    textAlign: 'center' as const,
    fontSize: '0.875rem',
    color: '#9ca3af',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  badge: {
    marginLeft: '8px',
    fontSize: '0.75rem',
    color: '#93c5fd',
  },
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      © {new Date().getFullYear()} MyApp. Todos os direitos reservados.
      <span style={styles.badge}>[shared-ui]</span>
    </footer>
  )
}
