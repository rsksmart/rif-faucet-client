import config from './config-local.json'
import { requestBalance, receiveBalance, requestDispense, receiveDispense, errorDispense } from './actions';
import Web3 from 'web3';
import abis from './abis.json';

export const getBalance = () => dispatch => {
  dispatch(requestBalance());
  const web3 = new Web3(config.publicNode);
  const rif = new web3.eth.Contract(abis.rifAbi, config.rif);

  rif.methods.balanceOf(config.faucet).call()
    .then(balance => dispatch(receiveBalance(web3.utils.fromWei(balance.toString()))))
    .catch(e => console.log(e));
};

export const dispense = (provider, account, to) => dispatch => {
  dispatch(requestDispense());

  const web3 = new Web3(provider);
  const faucet = new web3.eth.Contract(abis.faucetAbi, config.faucet);

  web3.eth.getBlock('latest')
    .then(({ minimumGasPrice }) => minimumGasPrice < 1 ? 1 : Math.ceil(minimumGasPrice * 1.1))
    .then(gasPrice =>
      faucet.methods.dispense(to)
        .send({ gasPrice, from: account })
        .on('transactionHash', hash => dispatch(receiveDispense(hash))))
        .catch(error => dispatch(errorDispense(error.message)));
}

export const getAccount = (provider) => {
  const web3 = new Web3(provider)
  return web3.eth.getAccounts().then(accounts => accounts[0].toLowerCase())
}
