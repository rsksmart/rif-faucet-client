import React, { Component } from 'react';
import config from './config-local.json';
import { Container, Row, Col, Button } from 'react-bootstrap';
import rLogin from './rLogin';
import DispenseContainer from './components/DispenseContainer';
import './faucet.css'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      account: null,
      web3Provider: null,
      showError: false
    };

    this.hideError = this.hideError.bind(this);
    this.connectRLogin = this.connectRLogin.bind(this);
  }

  componentDidMount () {
    const { getBalance } = this.props;
    getBalance();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.errorDispense !== this.props.errorDispense && newProps.errorDispense) {
      this.setState({ showError: true });
    }
  }

  hideError () {
    this.setState({ showError: false });
  }

  connectRLogin () {
    rLogin.connect()
      .then(response => {
        this.setState({ 
          ...this.state,
          web3Provider: response.provider,
        })

        this.props.getAccount(response.provider)
          .then(account => this.setState({ ...this.state, account }))
      })
      .catch(err => console.log('ERROR', err))
  }

  render () {
    const { balance, getBalance, dispense } = this.props;
    const { web3Provider, account } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="assets/img/logo.svg" className="logo" alt="logo" />
            </a>
          </div>
        </nav>
        <Container style={{ textAlign: 'center' }}>
          <Row>
            <div className="col-lg-12 main-title-box">
              <h1>rif testnet faucet</h1>
              <p>Get tRIF tokens and test your RIFOS implementations</p>
            </div>
          </Row>
          <Row>
            <Col>
              <p>
                faucet balance: {balance || '...'} tRIF
                (<Button variant='link' onClick={getBalance} style={{ padding: 0 }}>reload</Button>)
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {!web3Provider && <Button variant='primary' onClick={this.connectRLogin}>Connect Wallet</Button>}
              
              {!!web3Provider &&
                <DispenseContainer account={account} dispense={(to) => dispense(web3Provider, account, to)} />}
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
        </Container>
        <footer>
          <div className="footer-top">
            <Container>
              <Row>
                <div className="col-lg-12">
                  <img src="assets/img/powered_by_iov.svg" className="img-fluid powered_by" alt="powered_by" />
                </div>
                <div className="col-lg-3">
                  <span className="footer-title mb-3">What is RIF?</span>
                  <p className="mb-5">RIF goal is to enable Decentralized Sharing Economies to flourish in order to empower and protect the value of individuals.</p>
                </div>
                <div className="col-lg-2">
                  <b><a href="https://www.rsk.co/" target="_blank" rel='noopener noreferrer'>RSK</a></b>
                  <a href='https://developers.rsk.co' target='_blank' alt='libs' rel='noopener noreferrer'>Documentation</a>
                  <a href='https://faucet.testnet.rsk.co/' target='_blank' alt='libs' rel='noopener noreferrer'>tRBTC Faucet</a>
                </div>
                <div className="col-lg-2">
                  <b><a href="https://www.rifos.org/" target="_blank" rel='noopener noreferrer'>RIF</a></b>
                  <a href='https://developers.rsk.co/rif' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Documentation</a>
                  <a href='https://www.rifos.org/assets/whitepapers/rif-whitepaper-en.pdf' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Whitepaper</a>
                </div>
                <div className="col-lg-2">
                  <b><a href="https://www.rifos.org/rif-name-service/" target="_blank" rel='noopener noreferrer'>RIF Name Service</a></b>
                  <a href='https://developers.rsk.co/rif/rns' target='_blank' alt='libs' rel='noopener noreferrer'>Documentation</a>
                  <a href='https://manager.rns.rifos.org/' target='_blank' alt='libs' rel='noopener noreferrer'>Manager</a>
                </div>
                <div className="col-lg-3">
                  <b><a href="https://www.rifos.org/rif-lumino-network/" target="_blank" rel='noopener noreferrer'>RIF Lumino Network</a></b>
                  <a href='https://explorer.lumino.rifos.org/' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Explorer</a>
                  <a href='https://developers.rsk.co/rif/lumino' target='_blank' alt='rif_whitepaper' rel='noopener noreferrer'>Docs</a>
                </div>
              </Row>
            </Container>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
