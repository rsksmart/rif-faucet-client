import config from './config.json'
import { requestBalance, receiveBalance, requestDispense, errorDispense, receiveDispense, requestNetwork, receiveNetwork } from './actions';
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
  if (!window.ethereum || (window.ethereum.networkVersion !== undefined && window.ethereum.networkVersion !== config.networkId))
    return dispatch(errorDispense('Connect to RSK Testnet'));

  let web3;
  let to;

  window.ethereum.enable()
    .then(accounts => {
      to = accounts[0];
      web3 = new Web3(window.ethereum, null, { defaultAccount: accounts[0] });
    })
    .then(() => web3.eth.getBlock('latest'))
    .then(({ minimumGasPrice }) => minimumGasPrice < 1 ? 1 : Math.ceil(minimumGasPrice * 1.1))
    .then(gasPrice => {
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

      faucet.methods.dispense(to).send({ gasPrice })
        .on('transactionHash', hash => dispatch(receiveDispense(hash)))
        .catch(error => dispatch(errorDispense(error.message)));
    })
    .catch(e => dispatch(errorDispense(e.message)));
}

export const getNetwork = () => dispatch => {
  dispatch(requestNetwork());
  if (!window.web3) {
    dispatch(receiveNetwork(undefined));
    return;
  }
  window.web3.version.getNetwork((err,res) => {
    if (err) {
      dispatch(receiveNetwork(undefined));
    }

    dispatch(receiveNetwork(res));
  });
};
