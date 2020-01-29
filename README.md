# tRIF Faucet

## Setup

```sh
git clone https://github.com/riflabs/rif-faucet-client.git
cd rif-faucet-client
yarn
```

## Run

```sh
yarn start
```

## Build for production

```sh
yarn build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

1. Install Metamask
2. Connect Metamask to RSK Testnet
  > Public node: https://public-node.testnet.rsk.co
3. Click on `dispense`!

## Configuration file

Under `/src/config.json` file, configure the token contract under `rif` key, and the faucet contract address under `faucet` key.

A sample faucet contract can be found in the Github Repository ["rif-faucet"](https://github.com/riflabs/rif-faucet).
