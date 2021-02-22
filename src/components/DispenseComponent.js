import React, { useState, useEffect } from 'react'
import { Button, Alert, Form } from 'react-bootstrap'

const DispenseComponent = ({ account, dispense, dispensing, txDispense, errorDispense }) => {
  const [input, setInput] = useState(null)

  useEffect(() => {
    setInput(account)
  }, [account])

  return (
    <div>
      <Form.Label>
        Address to dispense to 
        {account === input && <> (your address)</>}
        :
      </Form.Label>
      {input && (
        <Form.Control
          id="dispenseTo"
          type="text"
          value={input}
          onChange={evt => setInput(evt.target.value)}
          className="accountInput" />
      )}
      <Button variant='primary' onClick={() => dispense(input)} disabled={dispensing}>{dispensing ? '...' : 'dispense tRIF'}</Button>

      <Alert variant={errorDispense ? 'danger' : 'success'} show={!!txDispense || !!errorDispense}>
        {txDispense && (
        <p>Dispensing, see the transaction on 
          <a href={`https://explorer.testnet.rsk.co/tx/${txDispense}`} target='_blank' rel='noopener noreferrer'>the explorer!</a>
        </p>)}
        {errorDispense}
      </Alert>
    </div>
  )
}

export default DispenseComponent
