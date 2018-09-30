import React, { Component } from 'react';
import { CepInput } from './CepInput';

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      errorMsg: '',
    };
  }

  handleError = (errorMsg) => {
    this.setState(state => ({error: true, errorMsg: errorMsg}))
  }

  handleSuccess = (address) => {
    this.setState({address: address, error: false, errors: []});
  }

  render() {
    const hasError = this.state.error;
    let errorMsg;
    if (hasError) {
      errorMsg = <ul><li style={{color: 'red'}}>{this.state.errorMsg}</li></ul>;
    }

    const address = this.state.address;
    let addressStr = '';
    if (address) {
      addressStr = `${address.cep}: ${address.logradouro} - ${address.uf}`
    }

    return (
      <div>
        <h1>Consultar cep</h1>
        {errorMsg}

        {addressStr}

        <CepInput onError={this.handleError} onSuccess={this.handleSuccess} />
      </div>
    );
  }
}

export default App;
