import React, { Component } from 'react';
import config from './config.json';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import rLogin from './rLogin';
import DispenseContainer from './components/DispenseContainer';
import AddRIFTokenComponent from './components/AddRIFTokenComponent';
import './faucet.css'
import { TextInput } from "./components/TextInput";
import { Footer } from "./components/Footer";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      account: null,
      gas: null,
      web3Provider: null
    };

    this.connectRLogin = this.connectRLogin.bind(this);
  }

  componentDidMount () {
    const { getBalance } = this.props;
    getBalance();
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
        
        this.props.getUserBalance(response.provider)
            .then(gas => this.setState({ ...this.state, gas }))

        // reset all if something changes:
        const initState = ({ ...this.state, web3Provider: null, gas: null });
        response.provider.on('accountsChanged', () => this.setState(initState));
        response.provider.on('disconnect', () => this.setState(initState));
      })
      .catch(err => console.log('ERROR', err))
  }

  onOpen (name) {
    const URL_MAP = {
      'faucet_address': config.faucet,
      'trif_address': config.rif,
    }
    window.open(`https://explorer.testnet.rsk.co/address/${URL_MAP[name]}`, '_blank', 'noopener noreferrer')
  }
  render () {
    const { balance, getBalance, dispense } = this.props;
    const { web3Provider, account, gas } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
          <div>
            <a className="navbar-brand" href="/">
              <img src="assets/img/rif_new.svg" className="logo" alt="logo" />
            </a>
          </div>
        </nav>
        <Container className='container-faucet'>
          <Row>
            <div className="col-lg-12 main-title-box">
              <h1>RIF Testnet Faucet</h1>
              <p className='rif-description'>Get RIF tokens and test your RIFOS implementations</p>
            </div>
          </Row>
          <Row>
            <Col>
              <TextInput name='balance' label='Balance' rightText='RELOAD' value={balance ?? ''} onRightTextClick={getBalance} />
              {!web3Provider && <Button block onClick={this.connectRLogin} size='lg'>CONNECT YOUR WALLET</Button>}
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput name='faucet_address' label='Faucet Address' rightText='OPEN' value={config.faucet} inputColorVariant='secondary' onRightTextClick={this.onOpen} />
              <TextInput name='trif_address' label='TRIF Address' rightText='OPEN' value={config.rif} inputColorVariant='secondary' onRightTextClick={this.onOpen} />
            </Col>
          </Row>
          {web3Provider && web3Provider.isMetaMask && !web3Provider.isNiftyWallet && (
            <>
              <Row>
                <Col>
                  <AddRIFTokenComponent />
                </Col>
              </Row>
              <Row style={{ marginTop: '2em' }}>
                <Col>
                  <TextInput name='your_address' label='Your Address' value={account ?? ''} inputColorVariant='secondary' />
                </Col>
              </Row>
              <Row>
                <Col>
                  {(gas !== 0)
                      ? <DispenseContainer account={account} dispense={(to) => dispense(web3Provider, account, to)} />
                      : <Alert variant="warning">
                        <p>You do not have enough gas to request RIF. First, use the <a href='https://faucet.rsk.co/' target='_blank' rel='noopener noreferrer'>rBTC faucet</a> to get gas, then return here to get RIF.</p>
                      </Alert>
                  }
                </Col>
              </Row>
            </>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
