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

export default MoneroWalletRPC;
