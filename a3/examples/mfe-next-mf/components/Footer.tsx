import dynamic from 'next/dynamic'

/*
  O Footer não existe no bundle deste projeto.
  O webpack resolve 'footerRemote/Footer' em runtime:
  1. Baixa remoteEntry.js de http://localhost:3001
  2. Carrega o chunk do componente Footer
  3. Renderiza como qualquer outro componente React
*/
const RemoteFooter = dynamic(() => import('footerRemote/Footer'), {
  ssr: false,
  loading: () => (
    <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-300">
      Carregando...
    </footer>
  ),
})

export default function Footer() {
  return <RemoteFooter />
}
