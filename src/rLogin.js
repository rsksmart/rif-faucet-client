import RLogin from '@rsksmart/rlogin'

const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    injected: {}
  },
  supportedChains: [31, 8548]
})

export default rLogin
