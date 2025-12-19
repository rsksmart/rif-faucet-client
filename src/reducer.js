import { REQUEST_BALANCE, RECEIVE_BALANCE, REQUEST_DISPENSE, RECEIVE_DISPENSE, ERROR_DISPENSE, CONFIRM_DISPENSE} from './types';

const initialState = {
  balance: null,
  dispensing: false,
  errorDispense: null,
  txDispense: null,
  txDispenseCompleted: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BALANCE: return {
      ...state,
      balance: null
    }
    case RECEIVE_BALANCE: return {
      ...state,
      balance: action.balance
    }
    case REQUEST_DISPENSE: return {
      ...state,
      dispensing: true,
      errorDispense: null,
      txDispense: null,
      txDispenseCompleted: false,
    }
    case RECEIVE_DISPENSE: return {
      ...state,
      dispensing: false,
      errorDispense: null,
      txDispense: action.tx,
      txDispenseCompleted: false,
    }
    case CONFIRM_DISPENSE: return {
      ...state,
      errorDispense: null,
      txDispense: action.tx,
      txDispenseCompleted: true,
    }
    case ERROR_DISPENSE: return {
      ...state,
      dispensing: false,
      errorDispense: action.error,
      txDispense: null,
      txDispenseCompleted: false,
    }
    default: return state;
  }
};
