import config from './config.json'
import { requestBalance, receiveBalance, requestDispense, errorDispense, receiveDispense } from './actions';


export const getBalance = () => dispatch => {
  dispatch(requestBalance());

  
  const rif = window.web3 && window.web3.eth.contract([
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
  ]).at(config.rif);

  return new Promise(resolve => {
    return rif.balanceOf(config.faucet, (err, res) => {
      const tokens = window.web3.fromWei(res.toNumber())
      if (!err) return resolve(dispatch(receiveBalance(tokens)));
    });
  });
};

export const dispense = () => dispatch => {
  dispatch(requestDispense());

  return new Promise(resolve => {
    return window.ethereum && window.ethereum.enable()
    .then(account => {
      const faucet = window.web3 && window.web3.eth.contract([
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
      ]).at('0xa98d30d3436f24886e0dd4bd440666dd1d140d5c');


      return faucet.dispense(account[0], (err, res) => {
        if (err) return resolve(dispatch(errorDispense(err.message)));

        return resolve(dispatch(receiveDispense(res)));
      });
    })
    .catch(e => dispatch(errorDispense(e.message)));
  });
}