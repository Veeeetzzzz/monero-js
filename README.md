# Monero-js - A JavaScript library for the Monero RPC.

Built from scratch, Monero-JS is a lightweight library to communicate with the Monero Wallet RPC. Minimal dependencies and focuses on security and scalability.

Download the CLI binaries from the [official Monero Site](https://www.getmonero.org/downloads/#cli)

Most anti-virus/anti-malware will flag the monerod and other binaries as a virus, because they have been spotted in the wild as "XMR miners" and subject to abuse. Add the folder you downloaded to your exclusions to avoid problems during development. There is no risk to you or your machine when running monerod.exe and mining does not run by default when it monerod.exe is run.

You'll need to make sure:

- monerod is running

Start monerod.exe & wait for it to finish syncing.

![image](https://github.com/user-attachments/assets/2840a9d9-efe4-43e4-a7d7-d63829c41df9)

- monero-wallet-rpc is running

Start the RPC with this command - replace args with your configs and make sure it's bound to your front end.

--wallet-file wallet --daemon-address="127.0.0.1:18081" --rpc-bind-ip 127.0.0.1 --rpc-bind-port 18083 --prompt-for-password --confirm-external-bind --rpc-access-control-origins="http://localhost:1234" --disable-rpc-login

## Install locally

Clone repository/download the package.

Install the npm package/library locally with ```npm install /path/to/monero-rpc.```

Note: this is the same as using npm install {package name} but I do not intend to publish this to the npm registery at this stage.

# Usage

You can use any JavaScript framework of your choice.

First, import the library and create a new instance:

```javascript

import MoneroWalletRPC from 'monero-rpc';

const wallet = new MoneroWalletRPC('http://127.0.0.1:18083/json_rpc');
```
Then add your methods as needed - use the [methods documentation](https://github.com/Veeeetzzzz/monero-js/blob/main/documentation/methods.md) for full list of methods avalible. 

To ensure all your methods can be called from a front end, you can launch unit tests with the files in [/unit-tests-front-end](https://github.com/Veeeetzzzz/monero-js/tree/main/unit-tests-front-end)

![image](https://github.com/user-attachments/assets/a4b72843-9f51-4a1e-a50e-77e983d9364e)

I recommend using [Parcel](https://www.npmjs.com/package/parcel) for testing which is a very fast compared to the 30-40 seconds it takes to build in React/Next.js

![image](https://github.com/user-attachments/assets/9799fea8-ce88-4ea0-b81f-37e27321663f)

## Building your application 

Use the index.html and index.js file as template. You want to reduce the amount of extra JavaScript needed, so pick the quickest way to deploy your application to keep the the dependencies low. 

Even create-react-app is excessive for most applications so think about your technical stack.

## Contributing

You can report issues or suggest feedback via the standard Github channels. Open an issue or suggestion and fill out the template.
