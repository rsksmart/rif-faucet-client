import { Button } from 'react-bootstrap'

const AddRIFTokenComponent = () => {
  const onButtonClick = () => window.ethereum.request({ method: 'wallet_watchAsset', params: {
      type: 'ERC20',
      options: {
        address: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
        symbol: 'tRIF',
        decimals: 18,
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3701.png'
      }
    }})
  
  return (
    <Button block size='lg' onClick={onButtonClick}
      style={styles.button}>
      <span>ADD TRIF TO WALLET</span>
      <span style={styles.span}>(If not in portfolio)</span>
    </Button>
  )
}

const styles = {
  button: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  span: { fontWeight: 400, fontSize: 10, fontFamily: 'Sora' },
}
export default AddRIFTokenComponent
