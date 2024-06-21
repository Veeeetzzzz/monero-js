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
import MoneroRPC from 'monero-rpc';

const rpc = new MoneroRPC('http://127.0.0.1:18082/json_rpc');
const balance = await rpc.getBalance();
console.log(balance);
```
```javascript
import MoneroRPC from 'monero-rpc';

const rpc = new MoneroRPC('http://127.0.0.1:18082/json_rpc');

async function main() {
  try {
    const balance = await rpc.getBalance();
    console.log('Balance:', balance);

    const address = await rpc.getAddress();
    console.log('Address:', address);

    // Make a transfer
    const result = await rpc.transfer([
      {address: 'recipient_address', amount: 100000000000}  // 0.1 XMR
    ], 100000000000);
    console.log('Transfer result:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```
