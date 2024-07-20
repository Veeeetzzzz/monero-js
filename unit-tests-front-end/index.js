import MoneroWalletRPC from 'monero-rpc';

const wallet = new MoneroWalletRPC('http://127.0.0.1:18083/json_rpc');

// Helper function to update the result on the page
function updateResult(result) {
    document.getElementById('result').textContent = JSON.stringify(result, null, 2);
}

// Helper function to handle errors
function handleError(error) {
    document.getElementById('result').textContent = `Error: ${error.message}`;
}

// Original methods
async function testMakeIntegratedAddress() {
    try {
        const result = await wallet.makeIntegratedAddress('your_payment_id_here');
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testSetDaemon() {
    try {
        const result = await wallet.setDaemon({
            address: '127.0.0.1:18081',
            trusted: true
        });
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testGetBalance() {
    try {
        const result = await wallet.getBalance({
            account_index: 0,
            all_accounts: true
        });
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

// New methods
async function testGetAddress() {
    try {
        const result = await wallet.getAddress(0, [0, 1]);
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testCreateAddress() {
    try {
        const result = await wallet.createAddress(0, 'New subaddress');
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testValidateAddress() {
    try {
        const result = await wallet.validateAddress('4...');
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testTransfer() {
    try {
        const result = await wallet.transfer({
            destinations: [{ amount: 1000000000000, address: '4...' }],
            account_index: 0,
            subaddr_indices: [0],
            priority: 2,
            mixin: 7
        });
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testSweepDust() {
    try {
        const result = await wallet.sweepDust();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testGetAccounts() {
    try {
        const result = await wallet.getAccounts();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testGetHeight() {
    try {
        const result = await wallet.getHeight();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testStopWallet() {
    try {
        const result = await wallet.stopWallet();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testRescanBlockchain() {
    try {
        const result = await wallet.rescanBlockchain();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testGetTxKey() {
    try {
        const result = await wallet.getTxKey('transaction_id_here');
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testGetTransfers() {
    try {
        const result = await wallet.getTransfers({
            in: true,
            out: true,
            pending: true,
            failed: true,
            pool: true
        });
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testStartMining() {
    try {
        const result = await wallet.startMining(2, false, false);
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testStopMining() {
    try {
        const result = await wallet.stopMining();
        updateResult(result);
    } catch (error) {
        handleError(error);
    }
}

async function testRPC(method, inputIds) {
    try {
        let params = {};
        if (inputIds) {
            if (Array.isArray(inputIds)) {
                inputIds.forEach(id => {
                    params[id] = document.getElementById(id).value;
                });
            } else {
                params = document.getElementById(inputIds).value;
            }
        }
        
        const result = await wallet[method](params);
        document.getElementById(`${method}-result`).textContent = 'PASS';
        document.getElementById(`${method}-result`).className = 'pass';
        document.getElementById('result').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById(`${method}-result`).textContent = 'FAIL';
        document.getElementById(`${method}-result`).className = 'fail';
        document.getElementById('result').textContent = `Error: ${error.message}`;
    }
}

// Make this function available globally
window.testRPC = testRPC;

// Add event listeners
document.getElementById('testMakeIntegratedAddress').addEventListener('click', testMakeIntegratedAddress);
document.getElementById('testSetDaemon').addEventListener('click', testSetDaemon);
document.getElementById('testGetBalance').addEventListener('click', testGetBalance);
document.getElementById('testGetAddress').addEventListener('click', testGetAddress);
document.getElementById('testCreateAddress').addEventListener('click', testCreateAddress);
document.getElementById('testValidateAddress').addEventListener('click', testValidateAddress);
document.getElementById('testTransfer').addEventListener('click', testTransfer);
document.getElementById('testSweepDust').addEventListener('click', testSweepDust);
document.getElementById('testGetAccounts').addEventListener('click', testGetAccounts);
document.getElementById('testGetHeight').addEventListener('click', testGetHeight);
document.getElementById('testStopWallet').addEventListener('click', testStopWallet);
document.getElementById('testRescanBlockchain').addEventListener('click', testRescanBlockchain);
document.getElementById('testGetTxKey').addEventListener('click', testGetTxKey);
document.getElementById('testGetTransfers').addEventListener('click', testGetTransfers);
document.getElementById('testStartMining').addEventListener('click', testStartMining);
document.getElementById('testStopMining').addEventListener('click', testStopMining);
