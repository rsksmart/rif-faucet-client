import App from './App';
import { getBalance, dispense } from './operations';
import { connect } from 'react-redux';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  getBalance: () => dispatch(getBalance()),
  dispense: () => dispatch(dispense())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
