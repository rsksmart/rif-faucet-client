import React from 'react'
import { Button, Alert } from 'react-bootstrap'

const DispenseComponent = ({ account, dispense, dispensing, txDispense, errorDispense }) => (
  <>
    <Button block onClick={() => dispense(account)} disabled={dispensing} size='lg'>
      {dispensing && 'DISPENSING TRIF...'}
      {!dispensing && 'DISPENSE TRIF TO THIS ADDRESS'}
    </Button>
    <Alert variant={errorDispense ? 'danger' : 'success'} show={!!txDispense || !!errorDispense}>
      {txDispense && (
        <p>Dispensing, see the transaction on
          <a href={`https://explorer.testnet.rsk.co/tx/${txDispense}`} target='_blank' rel='noopener noreferrer'> the explorer.</a>
        </p>)}
      {errorDispense}
    </Alert>
  </>
)

export default DispenseComponent
