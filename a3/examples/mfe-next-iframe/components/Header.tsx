export default function Header() {
  return (
    <header>
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900">MyApp</span>
        <ul className="flex gap-6 text-sm text-gray-600">
          <li><a href="#" className="hover:text-gray-900 transition-colors">Início</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Sobre</a></li>
          <li><a href="#" className="hover:text-gray-900 transition-colors">Contato</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <div className="bg-gray-900 text-white text-center py-20 px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Crie sua conta</h1>
        <p className="text-gray-400 text-lg">Preencha o formulário abaixo para começar.</p>
      </div>
    </header>
  )
}
