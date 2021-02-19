import App from './App';
import { getBalance, dispense, getAccount } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getBalance()),
  dispense: () => dispatch(dispense()),
  getAccount: (provider) => getAccount(provider)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
