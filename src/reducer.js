import { REQUEST_BALANCE, RECEIVE_BALANCE, REQUEST_DISPENSE, RECEIVE_DISPENSE, ERROR_DISPENSE, REQUEST_NETWORK, RECEIVE_NETWORK} from './types';

const initialState = {
  gettingBalance: false,
  balance: null,
  dispensing: false,
  errorDispense: null,
  txDispense: null,
  network: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BALANCE: return {
      ...state,
      gettingBalance: true,
      balance: null
    }
    case RECEIVE_BALANCE: return {
      ...state,
      gettingBalance: false,
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
    case REQUEST_NETWORK: return {
      ...state,
      gettingNetwork: true,
      network: null
    }
    case RECEIVE_NETWORK: return {
      ...state,
      gettingNetwork: false,
      network: action.network
    }
    default: return state;
  }
};
