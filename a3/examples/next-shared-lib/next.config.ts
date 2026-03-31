import type { NextConfig } from 'next'

/*
  Turbopack não suporta resolução de symlinks para fora do diretório raiz.
  Usamos --webpack para que o webpack resolva shared-ui via node_modules symlink.
  transpilePackages garante que o pacote seja transpilado pelo Next.js/webpack.
*/
const nextConfig: NextConfig = {
  transpilePackages: ['shared-ui'],
}

export default nextConfig
