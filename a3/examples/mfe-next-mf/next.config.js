const { NextFederationPlugin } = require('@module-federation/nextjs-mf')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          /*
            footerRemote: nome declarado no remote
            A URL aponta para o remoteEntry.js publicado pelo app remoto.
            Em produção substitua localhost:3001 pela URL real do deploy.
          */
          footerRemote: `footerRemote@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          'react/jsx-runtime': { singleton: true, requiredVersion: false },
          'react/jsx-dev-runtime': { singleton: true, requiredVersion: false },
          scheduler: { singleton: true, requiredVersion: false },
        },
      })
    )
    return config
  },
}

module.exports = nextConfig
