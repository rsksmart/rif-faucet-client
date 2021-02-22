import App from './App';
import { getFaucetBalance, getUserBalance, getAccount, dispense } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  balance: state.balance,
  dispensing: state.dispensing,
  txDispense: state.txDispense,
  errorDispense: state.errorDispense
});

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getFaucetBalance()),
  getAccount: (provider) => getAccount(provider),
  getUserBalance: (provider, account) => getUserBalance(provider, account),
  dispense: (provider, account, to) => dispatch(dispense(provider, account, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
