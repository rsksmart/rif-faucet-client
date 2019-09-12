import { REQUEST_BALANCE, RECEIVE_BALANCE, REQUEST_DISPENSE, RECEIVE_DISPENSE, ERROR_DISPENSE, REQUEST_NETWORK, RECEIVE_NETWORK } from "./types";

export const requestBalance = () => ({
  type: REQUEST_BALANCE
});

export const receiveBalance = balance => ({
  type: RECEIVE_BALANCE,
  balance
});

export const requestDispense = () => ({
  type: REQUEST_DISPENSE
});

export const receiveDispense = tx => ({
  type: RECEIVE_DISPENSE,
  tx
});

export const errorDispense = error => ({
  type: ERROR_DISPENSE,
  error
});

export const requestNetwork = () => ({
  type: REQUEST_NETWORK
});

export const receiveNetwork = network => ({
  type: RECEIVE_NETWORK,
  network
});
