class MoneroWalletRPC {
  constructor(url) {
    // URL should be in the format: http://IP:PORT/json_rpc
    // For example: http://127.0.0.1:18082/json_rpc
    this.url = url;
  }

  async call(method, params = {}) {
    // This method creates the JSON-RPC request
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // This body corresponds to the -d parameter in the curl example
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '0',
        method: method,  // This is the $METHOD in the curl example
        params: params,  // This is the $PARAMS in the curl example
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result;
  }

  // Example method using the JSON-RPC interface
  async makeIntegratedAddress(paymentId) {
    return this.call('make_integrated_address', { payment_id: paymentId });
  }

  //JSON RPC method is set_daemon
  async setDaemon({
    address = "",
    trusted = false,
    ssl_support = "autodetect",
    ssl_private_key_path,
    ssl_certificate_path,
    ssl_ca_file,
    ssl_allowed_fingerprints,
    ssl_allow_any_cert = false,
    username,
    password
  } = {}) {
    const params = {
      address,
      trusted,
      ssl_support,
      ssl_private_key_path,
      ssl_certificate_path,
      ssl_ca_file,
      ssl_allowed_fingerprints,
      ssl_allow_any_cert,
      username,
      password
    };

    // Remove undefined parameters
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

    return this.call('set_daemon', params);
  }

  //JSON RPC method is get_balance
  async getBalance({
    account_index,
    address_indices,
    all_accounts = false,
    strict = false
  } = {}) {
    const params = {
      account_index,
      address_indices,
      all_accounts,
      strict
    };

    // Remove undefined parameters
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

    return this.call('get_balance', params);
  }
}

  // get_address
  async getAddress(account_index, address_index) {
    return this.call('get_address', { account_index, address_index });
  }

  // get_address_index
  async getAddressIndex(address) {
    return this.call('get_address_index', { address });
  }

  // create_address
  async createAddress(account_index, label, count) {
    return this.call('create_address', { account_index, label, count });
  }

  // label_address
  async labelAddress(index, label) {
    return this.call('label_address', { index, label });
  }

  // validate_address
  async validateAddress(address, any_net_type, allow_openalias) {
    return this.call('validate_address', { address, any_net_type, allow_openalias });
  }

  // transfer
  async transfer(destinations, account_index, subaddr_indices, priority, ring_size, unlock_time, payment_id, get_tx_key, do_not_relay, get_tx_hex, get_tx_metadata) {
    return this.call('transfer', { 
      destinations, 
      account_index, 
      subaddr_indices, 
      priority, 
      ring_size, 
      unlock_time, 
      payment_id, 
      get_tx_key, 
      do_not_relay, 
      get_tx_hex, 
      get_tx_metadata 
    });
  }

  // transfer_split
  async transferSplit(destinations, account_index, subaddr_indices, priority, ring_size, unlock_time, payment_id, get_tx_keys, do_not_relay, get_tx_hex, get_tx_metadata) {
    return this.call('transfer_split', { 
      destinations, 
      account_index, 
      subaddr_indices, 
      priority, 
      ring_size, 
      unlock_time, 
      payment_id, 
      get_tx_keys, 
      do_not_relay, 
      get_tx_hex, 
      get_tx_metadata 
    });
  }

  // sign_transfer
  async signTransfer(unsigned_txset, export_raw) {
    return this.call('sign_transfer', { unsigned_txset, export_raw });
  }

  // submit_transfer
  async submitTransfer(tx_data_hex) {
    return this.call('submit_transfer', { tx_data_hex });
  }

  // sweep_dust
  async sweepDust(get_tx_keys, do_not_relay, get_tx_hex, get_tx_metadata) {
    return this.call('sweep_dust', { get_tx_keys, do_not_relay, get_tx_hex, get_tx_metadata });
  }

  // sweep_all
  async sweepAll(address, account_index, subaddr_indices, priority, ring_size, unlock_time, payment_id, get_tx_keys, below_amount, do_not_relay, get_tx_hex, get_tx_metadata) {
    return this.call('sweep_all', { 
      address, 
      account_index, 
      subaddr_indices, 
      priority, 
      ring_size, 
      unlock_time, 
      payment_id, 
      get_tx_keys, 
      below_amount, 
      do_not_relay, 
      get_tx_hex, 
      get_tx_metadata 
    });
  }

  // sweep_single
  async sweepSingle(address, txid, account_index, priority, ring_size, unlock_time, payment_id, get_tx_key, do_not_relay, get_tx_hex, get_tx_metadata) {
    return this.call('sweep_single', { 
      address, 
      txid, 
      account_index, 
      priority, 
      ring_size, 
      unlock_time, 
      payment_id, 
      get_tx_key, 
      do_not_relay, 
      get_tx_hex, 
      get_tx_metadata 
    });
  }

  // relay_tx
  async relayTx(hex) {
    return this.call('relay_tx', { hex });
  }

  // store
  async store() {
    return this.call('store');
  }

  // get_payments
  async getPayments(payment_id) {
    return this.call('get_payments', { payment_id });
  }

  // get_bulk_payments
  async getBulkPayments(payment_ids, min_block_height) {
    return this.call('get_bulk_payments', { payment_ids, min_block_height });
  }
}

  // get_accounts
  async getAccounts(tag) {
    return this.call('get_accounts', { tag });
  }

  // create_account
  async createAccount(label) {
    return this.call('create_account', { label });
  }

  // get_account_tags
  async getAccountTags() {
    return this.call('get_account_tags');
  }

  // get_height
  async getHeight() {
    return this.call('get_height');
  }

  // incoming_transfers
  async incomingTransfers(transfer_type, account_index, subaddr_indices) {
    return this.call('incoming_transfers', { transfer_type, account_index, subaddr_indices });
  }

  // query_key
  async queryKey(key_type) {
    return this.call('query_key', { key_type });
  }

  // make_integrated_address
  async makeIntegratedAddress(standard_address, payment_id) {
    return this.call('make_integrated_address', { standard_address, payment_id });
  }

  // split_integrated_address
  async splitIntegratedAddress(integrated_address) {
    return this.call('split_integrated_address', { integrated_address });
  }

  // stop_wallet
  async stopWallet() {
    return this.call('stop_wallet');
  }

  // rescan_blockchain
  async rescanBlockchain() {
    return this.call('rescan_blockchain');
  }

  // set_tx_notes
  async setTxNotes(txids, notes) {
    return this.call('set_tx_notes', { txids, notes });
  }

  // get_tx_notes
  async getTxNotes(txids) {
    return this.call('get_tx_notes', { txids });
  }

  // set_attribute
  async setAttribute(key, value) {
    return this.call('set_attribute', { key, value });
  }

  // get_attribute
  async getAttribute(key) {
    return this.call('get_attribute', { key });
  }
}

  // get_tx_key
  async getTxKey(txid) {
    return this.call('get_tx_key', { txid });
  }

  // check_tx_key
  async checkTxKey(txid, tx_key, address) {
    return this.call('check_tx_key', { txid, tx_key, address });
  }

  // get_tx_proof
  async getTxProof(txid, address, message) {
    return this.call('get_tx_proof', { txid, address, message });
  }

  // check_tx_proof
  async checkTxProof(txid, address, message, signature) {
    return this.call('check_tx_proof', { txid, address, message, signature });
  }

  // get_spend_proof
  async getSpendProof(txid, message) {
    return this.call('get_spend_proof', { txid, message });
  }

  // check_spend_proof
  async checkSpendProof(txid, message, signature) {
    return this.call('check_spend_proof', { txid, message, signature });
  }

  // get_reserve_proof
  async getReserveProof(all, account_index, amount, message) {
    return this.call('get_reserve_proof', { all, account_index, amount, message });
  }

  // check_reserve_proof
  async checkReserveProof(address, message, signature) {
    return this.call('check_reserve_proof', { address, message, signature });
  }

  // get_transfers
  async getTransfers(in_, out, pending, failed, pool, filter_by_height, min_height, max_height, account_index, subaddr_indices) {
    return this.call('get_transfers', { 
      in, out, pending, failed, pool, 
      filter_by_height, min_height, max_height, 
      account_index, subaddr_indices 
    });
  }

  // get_transfer_by_txid
  async getTransferByTxid(txid, account_index) {
    return this.call('get_transfer_by_txid', { txid, account_index });
  }

  // describe_transfer
  async describeTransfer(unsigned_txset, multisig_txset) {
    return this.call('describe_transfer', { unsigned_txset, multisig_txset });
  }

  // sign
  async sign(data) {
    return this.call('sign', { data });
  }

  // verify
  async verify(data, address, signature) {
    return this.call('verify', { data, address, signature });
  }

  // export_outputs
  async exportOutputs(all) {
    return this.call('export_outputs', { all });
  }
}

export default MoneroWalletRPC;
