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

      <Alert variant="danger" show={!!errorDispense}>{errorDispense}</Alert>
      <Alert variant='light' show={!!txDispense}>
        <a href={`https://explorer.testnet.rsk.co/tx/${txDispense}`} target='_blank' rel='noopener noreferrer'>{txDispense}</a>
      </Alert>
    </div>
  )
}

export default DispenseComponent
