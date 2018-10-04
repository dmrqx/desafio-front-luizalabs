import React, { Component } from 'react';
import { ViaCepLookup } from './viaCepLookup';

import { SearchForm } from './search/SearchForm';
import { MapTile } from './Map';

import { sameDigits, lastSubmitted, removeMask } from './utils/searchInputHelpers';

import './App.css';
import './leaflet.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      addresses: [],
      errorMessage: '',
      formValidity: false,
      ceps: [],
      currentCep: '',
      searching: false,
    };
  }

  handleChange = ({target}) => {
    this.setState(
      {
        currentCep: removeMask(target.value),
        formValidity: target.validity.valid,
      },
      () => {
        if (this.state.currentCep.length === 8) {
          this.validateCep()
        }
      }
    );
  }

  handleSubmit = (event, cep) => {
    event.preventDefault();

      this.setState({searching: true});
      const viaCep = new ViaCepLookup();
      viaCep.queryCep(cep).then(res => {
        this.setState(prevState => ({
          ceps: [...prevState.ceps, cep],
          searching: false
        }));

        // if (res.address) {
        //   this.handleSuccess(res.address)
        // }
      })
  }

  handleSuccess = (address) => {
    this.setState(prevState => ({addresses: [...prevState.addresses, address], error: false, errors: []}));
    const url = `https://nominatim.openstreetmap.org/search/br/${address.uf}/${address.localidade}/${address.logradouro}?format=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  validateCep() {
    if (sameDigits(this.state.currentCep)) {
      this.setState({errorMessage: 'O CEP digitado não é válido', formValidity: false});
      return false;
    }

    if (lastSubmitted([...this.state.ceps].pop(), this.state.currentCep)) {
      this.setState({errorMessage: 'Você acabou de pesquisar esse CEP. Que memória, hein?', formValidity: false});
      return false;
    }

    return true;
  }

  render() {
    return (
      <div>
        <SearchForm
          currentCep={this.state.currentCep}
          formValidity={this.state.formValidity}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searching={this.state.searching}
        />

        <MapTile />
      </div>
    );
  }
}

export default App;
