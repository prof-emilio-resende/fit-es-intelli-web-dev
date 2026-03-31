const { NextFederationPlugin } = require('@module-federation/nextjs-mf')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'footerRemote',
        /*
          remoteEntry.js é o manifesto público deste MFE.
          O host aponta para este arquivo para descobrir
          o que está exposto e como carregar.
        */
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          /*
            Chave:  o nome pelo qual o host importa o módulo
            Valor:  o caminho local do componente exposto
          */
          './Footer': './components/Footer',
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
