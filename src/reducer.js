import { REQUEST_BALANCE, RECEIVE_BALANCE, REQUEST_DISPENSE, RECEIVE_DISPENSE, ERROR_DISPENSE} from './types';

const initialState = {
  balance: null,
  dispensing: false,
  errorDispense: null,
  txDispense: null,
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
      txDispense: null
    }
    case RECEIVE_DISPENSE: return {
      ...state,
      dispensing: false,
      errorDispense: null,
      txDispense: action.tx
    }
    case ERROR_DISPENSE: return {
      ...state,
      dispensing: false,
      errorDispense: action.error,
      txDispense: null
    }
    default: return state;
  }
};
