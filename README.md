# Monero RPC

A JavaScript library for interacting with the Monero RPC.

## Install from NMP

```
npm install monero-rpc
```
## Install locally

Clone repository or download the package.

Install it locally with ```npm install /path/to/monero-rpc.```

## Usage

```javascript
// Create an instance of MoneroWalletRPC
const wallet = new MoneroWalletRPC('http://127.0.0.1:18082/json_rpc');

// Set up the daemon connection
await wallet.setDaemon({
  address: "http://localhost:18081",
  trusted: true
});

// Get balance for account index 0 and address indices 0 and 1
const balance = await wallet.getBalance({
  account_index: 0,
  address_indices: [0, 1]
});

console.log(balance);

// Get balance for all accounts
const allBalances = await wallet.getBalance({
  all_accounts: true
});

console.log(allBalances);
```
