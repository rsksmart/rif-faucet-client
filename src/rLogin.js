import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          31: 'https://did.testnet.rsk.co:4444'
        }
      }
    }
  },
  supportedChains: [31]
})

export default rLogin
