// const isProd = process.env.NODE_ENV === 'production'
// /* eslint-disable @typescript-eslint/no-var-requires */
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: !isProd
// })

// module.exports = withPWA()

const isProd = process.env.NODE_ENV === 'production'
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  experimental: {
    esmExternals: false
  }
})
