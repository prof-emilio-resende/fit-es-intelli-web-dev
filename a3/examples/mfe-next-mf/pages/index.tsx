import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/*
  CadastroForm usa react-hook-form (hooks).
  Com Module Federation o webpack pode carregar uma segunda
  cópia do React, quebrando hooks durante SSR.
  ssr: false garante que o componente só renderiza no cliente,
  onde há uma única instância de React em execução.
*/
const CadastroForm = dynamic(() => import('@/components/CadastroForm'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <CadastroForm />
      </main>
      <Footer />
    </div>
  )
}
