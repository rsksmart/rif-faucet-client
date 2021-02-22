import App from './App';
import { getBalance, getAccount, dispense } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getBalance()),
  getAccount: (provider) => getAccount(provider),
  dispense: (provider, account, to) => dispatch(dispense(provider, account, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
