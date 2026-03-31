import Header from '@/components/Header'
import CadastroForm from '@/components/CadastroForm'
import Footer from '@/components/Footer'

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
