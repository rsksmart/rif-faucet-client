import App from './App';
import { getBalance, dispense, getNetwork } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getBalance()),
  dispense: () => dispatch(dispense()),
  getNetwork: () => dispatch(getNetwork())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
