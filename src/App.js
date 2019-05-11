import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import config from './config.json'
import { Alert, Navbar, Nav, Container, Row, Col, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg'

class App extends Component {
  componentDidMount () {
    const { getBalance } = this.props;
    getBalance();
  }

  render () {
    const { gettingBalance, balance, getBalance, dispense, dispensing, errorDispense, txDispense } = this.props;
    const showNetworkAlert = window.ethereum.networkVersion !== config.networkId;

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
              <h5>Get tRIF tokens and test your RIFOS implementations.</h5>
            </Col>
          </Row>
          <Row>
            <Col>
            <Alert variant="warning" show={showNetworkAlert}>
              <Alert.Heading>Connect to RSK Testnet network.</Alert.Heading>
              <p>
                The tRIF faucet dispense RIF Tokens only in RSK testnet.
              </p>
              <hr />
              <p className="mb-0">
                Connect Metamask to an RSK Testnet node. No node?: use the <a href="https://nodes.rsk.co" target="_blank">public nodes</a>.
              </p>
            </Alert>
              <p>
                faucet balance: {gettingBalance ? '...' : balance} tRIF 
                (<Button variant='link' onClick={getBalance} style={{ padding: 0 }}>reload</Button>)
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant='primary' onClick={dispense} disabled={dispensing}>{dispensing ? '...' : 'dispense tRIF'}</Button>
              <br />
              {errorDispense && `error: ${errorDispense}`}
              {txDispense && `tx: ${txDispense}`}
            </Col>
          </Row>
          <hr />

          <h5>Related links:</h5>
          <Row>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title><a href="https://www.rsk.co/" target="_blank">RSK</a></Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href='https://docs.rsk.co' target='_blank' alt='libs' rel='noopener noreferrer'>Documentation</a></ListGroupItem>
                    <ListGroupItem><a href='https://faucet.testnet.rsk.co/' target='_blank' alt='libs' rel='noopener noreferrer'>tRBTC Faucet</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title><a href="https://www.rifos.org/" target="_blank">RIF</a></Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href='https://docs.rifos.org/' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Documentation</a></ListGroupItem>
                    <ListGroupItem><a href='https://docs.rifos.org/rif-whitepaper-en.pdf' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Whitepaper</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title><a href="https://www.rifos.org/rif-name-service/" target="_blank">RIF Name Service</a></Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href='https://docs.rns.rifos.org/' target='_blank' alt='libs' rel='noopener noreferrer'>Documentation</a></ListGroupItem>
                    <ListGroupItem><a href='https://docs.rns.rifos.org/Libs/' target='_blank' alt='libs' rel='noopener noreferrer'>Libraries</a></ListGroupItem>
                    <ListGroupItem><a href='https://rns.rifos.org/' target='_blank' alt='libs' rel='noopener noreferrer'>Manager</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title><a href="https://www.rifos.org/rif-lumino-network/" target="_blank">RIF Lumino Network</a></Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem><a href='https://explorer.lumino.rifos.org/' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Explorer</a></ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <hr />

          <p>© 2019 RIF Labs Limited</p>
        </Container>
      </div>
    );
  }
}

export default App;
