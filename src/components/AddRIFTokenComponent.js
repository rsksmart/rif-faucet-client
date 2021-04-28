import { Button } from 'react-bootstrap'

const AddRIFTokenComponent = () => <Button onClick={() => window.ethereum.request({ method: 'wallet_watchAsset', params: {
  type: 'ERC20',
  options: {
    address: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    symbol: 'tRIF',
    decimals: 18,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3701.png'
  }
}})}>Add tRIF to wallet</Button>

export default AddRIFTokenComponent
