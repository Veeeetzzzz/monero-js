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

    return this.call('set_daemon', params);
  }
}

export default MoneroWalletRPC;
