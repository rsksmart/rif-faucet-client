import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import config from './config.json';
import { Alert, Navbar, Container, Row, Col, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import logo from './logo.svg';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = { showError: false };
    this.hideError = this.hideError.bind(this);
  }

  componentDidMount () {
    const { getBalance, getNetwork } = this.props;
    getBalance();
    getNetwork();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.errorDispense !== this.props.errorDispense && newProps.errorDispense) {
      this.setState({ showError: true });
    }
  }

  hideError () {
    this.setState({ showError: false });
  }

  render () {
    const { gettingBalance, balance, getBalance, dispense, dispensing, errorDispense, txDispense, gettingNetwork, network } = this.props;
    const showMetamaskAlert = !window.ethereum;

    return (
      <div>
        <Navbar bg='dark'>
          <Navbar.Brand href="#">
            <img src={logo} height='40' className='d-inline-block align-top' alt='logo' />
          </Navbar.Brand>
        </Navbar>
        <Container style={{ textAlign: 'center' }}>
          <Row>
            <Col>
              <h1>rif testnet faucet</h1>
              <h3><small>Get tRIF tokens and test your RIFOS implementations</small></h3>
            </Col>
          </Row>
          {
            (showMetamaskAlert || gettingNetwork || dispensing || (network !== undefined && network !== config.networkId)) &&
            <Row>
              <Col>
                <Alert variant="warning" show={showMetamaskAlert}>
                  <Alert.Heading>Get Metamask or Nifty wallet</Alert.Heading>
                  <p>
                    <a href='https://metamask.io/' target='_blank' rel='noopener noreferrer'>Download Metamask</a>
                  </p>
                  <p>
                    <a href='https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid' target='_blank' rel='noopener noreferrer'>Download Nifty</a>
                  </p>
                </Alert>
                <Alert variant="warning" show={!showMetamaskAlert && (gettingNetwork || (network !== undefined && network !== config.networkId)) }>
                  <Alert.Heading>Connect to RSK Testnet network.</Alert.Heading>
                  <p>
                    The tRIF faucet dispense RIF Tokens only in RSK testnet.
                  </p>
                  <hr />
                  <p className="mb-0">
                    Connect Metamask to an RSK Testnet node. No node? Use the <a href="https://nodes.rsk.co" target="_blank" rel='noopener noreferrer'>public nodes</a>.
                  </p>
                </Alert>
              </Col>
            </Row>
          }
          <Row>
            <Col>
              <p>
                faucet balance: {gettingBalance ? '...' : balance} tRIF
                (<Button variant='link' onClick={getBalance} style={{ padding: 0 }} disabled={gettingNetwork || dispensing || (network !== undefined && network !== config.networkId)}>reload</Button>)
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant='primary' onClick={dispense} disabled={ gettingNetwork || dispensing || (network !== undefined && network !== config.networkId) }>{dispensing ? '...' : 'dispense tRIF'}</Button>
              <br />
              {
                errorDispense &&
                <Alert variant='danger' show={this.state.showError} dismissible onClose={this.hideError}>{errorDispense}</Alert>
              }
              {
                txDispense &&
                <Alert variant='light'>
                  <a href={`https://explorer.testnet.rsk.co/tx/${txDispense}`} target='_blank' rel='noopener noreferrer'>{txDispense}</a>
                </Alert>
              }
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>
                tRIF address: <a href={`https://explorer.testnet.rsk.co/address/${config.rif}`} target='_blank' rel='noopener noreferrer'>{config.rif}</a><br />
                faucet address: <a href={`https://explorer.testnet.rsk.co/address/${config.faucet}`} target='_blank' rel='noopener noreferrer'>{config.faucet}</a>
              </p>
            </Col>
          </Row>
          <hr />
          <h5>Related links:</h5>
          <Row>
            <Col style={{ padding: 10 }} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title><a href="https://www.rsk.co/" target="_blank" rel='noopener noreferrer'>RSK</a></Card.Title>
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
                  <Card.Title><a href="https://www.rifos.org/" target="_blank" rel='noopener noreferrer'>RIF</a></Card.Title>
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
                  <Card.Title><a href="https://www.rifos.org/rif-name-service/" target="_blank" rel='noopener noreferrer'>RIF Name Service</a></Card.Title>
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
                  <Card.Title><a href="https://www.rifos.org/rif-lumino-network/" target="_blank" rel='noopener noreferrer'>RIF Lumino Network</a></Card.Title>
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
