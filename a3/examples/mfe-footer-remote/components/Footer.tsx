export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} MyApp. Todos os direitos reservados.
      <span className="ml-2 text-xs text-blue-400">[footer · remote @ :3001]</span>
    </footer>
  )
}
