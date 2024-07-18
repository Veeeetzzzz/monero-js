# Monero RPC

A JavaScript library for interacting with the Monero RPC. 

You'll need to make sure:

- monerod is running
- monero-rpc is running

Start monerod.exe & wait for it to finish syncing.

![image](https://github.com/user-attachments/assets/2840a9d9-efe4-43e4-a7d7-d63829c41df9)

Start the RPC with this command - replace args with your configs and make sure it's bound to your front end.

--wallet-file wallet --daemon-address="127.0.0.1:18081" --rpc-bind-ip 127.0.0.1 --rpc-bind-port 18083 --prompt-for-password --confirm-external-bind --rpc-access-control-origins="http://localhost:1234" --disable-rpc-login

## Install locally

Clone repository or download the package.

Install it locally with ```npm install /path/to/monero-rpc.```

## Usage

After running the npm command in your directory you can start building your website and add the functionality you need. 

## Create your front end in any JavaScript framework - create index.html file

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monero Wallet RPC Tester</title>
</head>
<body>
    <h1>Monero Wallet RPC Tester</h1>
    <button id="testMakeIntegratedAddress">Test Make Integrated Address</button>
    <button id="testSetDaemon">Test Set Daemon</button>
    <button id="testGetBalance">Test Get Balance</button>
    <h2>Result:</h2>
    <pre id="result"></pre>
    <script type="module" src="./index.js"></script>
</body>
</html>

```

## Create index.js file and place in same directory as index.html

```javascript

//Imports
import MoneroWalletRPC from 'monero-rpc';

// Create an instance of MoneroWalletRPC
// Make sure this address and port matches the port and address you used to start up monero-wallet-rpc.exe
const wallet = new MoneroWalletRPC('http://127.0.0.1:18082/json_rpc');

// Set up the daemon connection
//Don't change this address
await wallet.setDaemon({
  address: "127.0.0.1:18081",
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
## Contributing
## Terms
