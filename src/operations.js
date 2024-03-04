import config from './config.json'
import { requestBalance, receiveBalance, requestDispense, receiveDispense, errorDispense } from './actions';
import Web3 from 'web3';
import abis from './abis.json';

export const getFaucetBalance = () => dispatch => {
  dispatch(requestBalance());
  const web3 = new Web3(config.publicNode);
  const rif = new web3.eth.Contract(abis.rifAbi, config.rif.toLowerCase());

  rif.methods.balanceOf(config.faucet.toLowerCase()).call()
    .then(balance => dispatch(receiveBalance(web3.utils.fromWei(balance.toString(), 'ether'))))
    .catch(e => console.log(e));
};

export const dispense = (provider, account, to) => dispatch => {
  dispatch(requestDispense());

  const web3 = new Web3(provider);
  const faucet = new web3.eth.Contract(abis.faucetAbi, config.faucet.toLowerCase());

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

export const getUserBalance = (provider) => {
  const web3 = new Web3(provider)
  return new Promise((resolve, reject) =>
    getAccount(provider)
      .then(account => web3.eth.getBalance(account, (error,result) => error ? reject(error) : resolve(parseInt(result)))))
}
