import React from 'react'
import { Alert } from 'react-bootstrap';

const UserBalanceComponent = ({ gas }) =>
  (gas === 0)
  ? (
    <Alert variant="warning">
      <p>You do not have enough gas to request RIF. First, use the <a href='https://faucet.rsk.co/' target='_blank' rel='noopener noreferrer'>rBTC faucet</a> to get gas, then return here to get RIF.</p>
    </Alert>
  )
  : <></>

export default UserBalanceComponent;
