import RLogin from '@rsksmart/rlogin'

const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {},
  supportedChains: [31]
})

export default rLogin
