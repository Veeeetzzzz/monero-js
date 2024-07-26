# Monero RPC Library Documentation

## Table of Contents
- [Available Methods](#available-methods)
  - [makeIntegratedAddress](#makeintegratedaddress)
  - [setDaemon](#setdaemon)
  - [getBalance](#getbalance)
  - [getAddress](#getaddress)
  - [createAddress](#createaddress)
  - [validateAddress](#validateaddress)
  - [transfer](#transfer)
  - [sweepDust](#sweepdust)
  - [getAccounts](#getaccounts)
  - [getHeight](#getheight)
  - [stopWallet](#stopwallet)
  - [rescanBlockchain](#rescanblockchain)
  - [getTxKey](#gettxkey)
  - [getTransfers](#gettransfers)
  - [startMining](#startmining)
  - [stopMining](#stopmining)
- [Error Handling](#error-handling)
- [Notes](#notes)

## Installation

Install the library using npm:

```bash
npm install path/to/monero-rpc
```

## Usage

First, import the library and create a new instance:

```javascript

import MoneroWalletRPC from 'monero-rpc';

const wallet = new MoneroWalletRPC('http://127.0.0.1:18083/json_rpc');
```

# Available Methods

# makeIntegratedAddress

Create an integrated address for receiving funds.

```javascript

const result = await wallet.makeIntegratedAddress('payment_id_here');
```

# setDaemon

Set the daemon to use for this wallet.

``` javascript

const result = await wallet.setDaemon({
    address: '127.0.0.1:18081',
    trusted: true
});

```

# getBalance

Retrieve the balance of the wallet or specific account.

```javascript

const result = await wallet.getBalance({
    account_index: 0,
    all_accounts: true
});
```

# getAddress

Get the address for a specific account and subaddress indices.

```javascript

const result = await wallet.getAddress(0, [0, 1]);
```

# createAddress

Create a new address for an account.

```javascript

const result = await wallet.createAddress(0, 'New subaddress');
```

# validateAddress

Check if an address is valid.

```javascript

const result = await wallet.validateAddress('4...');
```

# transfer

Send a transaction.

```javascript

const result = await wallet.transfer({
    destinations: [{ amount: 1000000000000, address: '4...' }],
    account_index: 0,
    subaddr_indices: [0],
    priority: 2,
    mixin: 7
});
```

# sweepDust

Sweep unmixable dust outputs.

```javascript

const result = await wallet.sweepDust();
```

# getAccounts

Get all accounts of the wallet.

```javascript

const result = await wallet.getAccounts();
```

# getHeight

Get the current block height.

```javascript

const result = await wallet.getHeight();
```

# stopWallet

Stop the wallet, saving its state.

```javascript

const result = await wallet.stopWallet();
```

# rescanBlockchain

Rescan the blockchain from scratch.

```javascript

const result = await wallet.rescanBlockchain();
```

# getTxKey

Get the transaction key for a given transaction.

```javascript

const result = await wallet.getTxKey('transaction_id_here');
```

# getTransfers

Get a list of transfers.

```javascript

const result = await wallet.getTransfers({
    in: true,
    out: true,
    pending: true,
    failed: true,
    pool: true
});
```

# startMining

Start mining in the Monero daemon.

```javascript

const result = await wallet.startMining(2, false, false);

```

# stopMining

Stop mining in the Monero daemon.

```javascript

const result = await wallet.stopMining();

```

# Error Handling

All methods return a Promise. Use try/catch blocks or .catch() to handle errors:

```javascript

try {
    const result = await wallet.getBalance();
    console.log(result);
} catch (error) {
    console.error('An error occurred:', error.message);
}

```

# Notes

- Ensure your Monero wallet RPC server is running and accessible at the URL you provide when creating the MoneroWalletRPC instance.
- Some methods may require the wallet to be unlocked or may have other prerequisites. Refer to the official Monero documentation for detailed information on each RPC method.
- Always handle sensitive information (like private keys and transaction details) securely.
- Remember to manage your connections properly, especially in long-running applications.

For more detailed information on Monero RPC calls, refer to the official Monero RPC documentation: [Monero RPC Documentation](https://www.getmonero.org/resources/developer-guides/wallet-rpc.html)
