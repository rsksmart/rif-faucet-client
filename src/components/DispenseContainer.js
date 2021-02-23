import DispenseComponent from './DispenseComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  dispensing: state.dispensing,
  txDispense: state.txDispense,
  errorDispense: state.errorDispense
});

export default connect(mapStateToProps)(DispenseComponent);
