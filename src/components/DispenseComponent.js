import React, { useState, useEffect } from 'react'
import { Button, Alert, Form } from 'react-bootstrap'

const DispenseComponent = ({ account }) => {
  const [dispensing, setDispensing] = useState(false)
  const [input, setInput] = useState(null)

  const resposneInitialState = { type: 'light', message: null }
  const [response, setResponse] = useState(resposneInitialState)

  useEffect(() => {
    setInput(account)
  }, [account])

  const handleDispense = () => {
    setDispensing(true)

    setResponse({ type: 'error', message: 'An error happened!'})
    setDispensing(false)
  }

  return (
    <div>
      <Form.Label>
        Address to dispense to 
        {account === input && <> (your address)</>}
        :
      </Form.Label>
      {input && (
        <Form.Control
          type="text"
          value={input}
          onChange={evt => setInput(evt.target.value)}
          className="accountInput" />
      )}
      <Button variant='primary' onClick={handleDispense} disabled={dispensing}>{dispensing ? '...' : 'dispense tRIF'}</Button>

      <Alert variant={response.type} show={!!response.message} dismissible onClose={() => setResponse(resposneInitialState)}>{response.message}</Alert>
    </div>
  )
}

export default DispenseComponent
