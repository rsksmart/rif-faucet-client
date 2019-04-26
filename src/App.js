import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import logo from './logo.svg'

class App extends Component {
  componentDidMount () {
    const { getBalance } = this.props;
    getBalance();
  }

  render () {
    const { gettingBalance, balance, getBalance, dispense, dispensing, errorDispense, txDispense } = this.props;

    return (
      <div>
        <Navbar bg='dark' variant='dark' expand='lg' sticky='top'>
          <Navbar.Brand href='/'>
            <img src={logo} width='100' className='d-inline-block align-top' alt='logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'></Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container style={{ textAlign: 'center' }}>
          <Row>
            <Col>
              <p>faucet balance: {gettingBalance ? '...' : balance} tRIF</p>
              <Button variant='link' onClick={getBalance}>reolad</Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Button variant='primary' onClick={dispense} disabled={dispensing}>{dispensing ? '...' : 'send me tRIF'}</Button>
              <br />
              {errorDispense && `error: ${errorDispense}`}
              {txDispense && `tx: ${txDispense}`}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
