import React, { Component } from 'react';
import { ViaCepLookup } from './viaCepLookup';

import { SearchForm } from './search/SearchForm';
import { MapTile } from './Map';

import { sameDigits, lastSubmitted } from './utils/searchInputHelpers';

import './App.css';
import './leaflet.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      errorMsg: '',
      ceps: [],
      addresses: [],
      searching: false,
    };
  }

  handleError = (errorMsg) => {
    this.setState(state => ({error: true, errorMsg: errorMsg}))
  }

  handleSubmit = (event, cep) => {
    event.preventDefault();

    if (this.shouldSubmit(cep)) {
      this.setState({searching: true});
      const viaCep = new ViaCepLookup();
      viaCep.queryCep(cep).then(res => {
        this.setState(prevState => ({
          ceps: [...prevState.ceps, cep],
          searching: false
        }));

        console.log(res)

        // if (res.address) {
        //   this.handleSuccess(res.address)
        // }
      })
    }
  }


  handleSuccess = (address) => {
    this.setState(prevState => ({addresses: [...prevState.addresses, address], error: false, errors: []}));
    const url = `https://nominatim.openstreetmap.org/search/br/${address.uf}/${address.localidade}/${address.logradouro}?format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  shouldSubmit(cep) {
    if (sameDigits(cep)) {
      // TODO: Add error message
      return false;
    }

    if (lastSubmitted([...this.state.ceps].pop(), cep)) {
      // TODO: Add error message
      return false;
    }

    return true;
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

    const isSearching = this.state.searching;

    return (
      <div>
        <h1>Consultar cep</h1>
        {errorMsg}

        {addressStr}

        <SearchForm
          handleSubmit={this.handleSubmit}
          searching={isSearching} />

        <MapTile />
      </div>
    );
  }
}

export default App;
