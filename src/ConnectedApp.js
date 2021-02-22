import App from './App';
import { getBalance, getAccount, dispense } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  balance: state.balance,
  dispensing: state.dispensing,
  txDispense: state.txDispense,
  errorDispense: state.errorDispense
});

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getBalance()),
  getAccount: (provider) => getAccount(provider),
  dispense: (provider, account, to) => dispatch(dispense(provider, account, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
