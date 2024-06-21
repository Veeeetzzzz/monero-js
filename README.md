# Monero RPC

A JavaScript library for interacting with the Monero RPC.

## Installation

```
npm install monero-rpc
```

## Usage

```javascript
import MoneroRPC from 'monero-rpc';

const rpc = new MoneroRPC('http://127.0.0.1:18082/json_rpc');
const balance = await rpc.getBalance();
console.log(balance);
```
