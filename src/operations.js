import config from './config.json'
import { requestBalance, receiveBalance, requestDispense, errorDispense, receiveDispense } from './actions';
import Web3 from 'web3';

export const getBalance = () => dispatch => {
  dispatch(requestBalance());

  const web3 = new Web3(config.publicNode);

  const rif = new web3.eth.Contract([
    {
      'constant': true,
      'inputs': [
        {
          'name': '_owner',
          'type': 'address'
        }
      ],
      'name': 'balanceOf',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    }
  ], config.rif);

  rif.methods.balanceOf(config.faucet).call()
  .then(balance => dispatch(receiveBalance(web3.utils.fromWei(balance.toString()))))
  .catch(e => console.log(e));
};

export const dispense = () => dispatch => {
  dispatch(requestDispense());

  if (!window.ethereum || window.ethereum.networkVersion !== config.networkId) return dispatch(errorDispense('Connect to RSK Testnet'));

  window.ethereum.enable()
  .then(accounts => {
    const web3 = new Web3(window.ethereum, null, { defaultAccount: accounts[0], defaultGasPrice: 0 });
    const faucet = new web3.eth.Contract([
      {
        'constant': false,
        'inputs': [
          {
            'name': 'to',
            'type': 'address'
          }
        ],
        'name': 'dispense',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function',
        'signature': '0x5f746233'
      }
    ], config.faucet);

    faucet.methods.dispense(accounts[0]).send()
    .on('transactionHash', hash => dispatch(receiveDispense(hash)))
    .catch(error => dispatch(errorDispense(error.message)));
  })
  .catch(e => dispatch(errorDispense(e.message)));
}
