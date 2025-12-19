import React from 'react'
import { Button, Alert } from 'react-bootstrap'

const DispenseComponent = ({ account, dispense, dispensing, txDispense, txDispenseCompleted, errorDispense }) => (
  <>
    <Button block onClick={() => dispense(account)} disabled={dispensing} size='lg'>
      {dispensing && 'DISPENSING TRIF...'}
      {!dispensing && 'DISPENSE TRIF TO THIS ADDRESS'}
    </Button>
    <Alert variant={errorDispense ? 'danger' : 'success'} show={!!txDispense || !!errorDispense}>
      {txDispense && (
        <p>
          {txDispenseCompleted ? 'RIF Dispensed, ' : 'Transaction pending, '}
          <a href={`https://explorer.testnet.rsk.co/tx/${txDispense}`} target='_blank' rel='noopener noreferrer'>
            {'see on the explorer'}
          </a>
        </p>
      )}
      {errorDispense && <p>{errorDispense}</p>}
    </Alert>
  </>
)

export default DispenseComponent
