import React, { Component } from 'react';
import { ViaCepLookup } from './viaCepLookup';

import { SearchForm } from './search/SearchForm';
import { OpenStreetMap } from './OpenStreetMap';

import { sameDigits, lastSubmitted, removeMask } from './utils/searchInputHelpers';

import './App.css';
import './leaflet.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      addresses: [],
      ceps: [],
      currentCep: '',
      errorMessage: '',
      formValidity: false,
      latitude: null,
      longitude: null,
      searching: false,
    };
  }

  handleChange = ({target}) => {
    this.setState({
        currentCep: removeMask(target.value),
        errorMessage: '',
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

    this.setState({
      currentCep: '',
      formValidity: false,
      searching: true
    });

    const viaCep = new ViaCepLookup();
    viaCep.queryCep(cep)
      .then(({errorMessage = '', ...address}) => {
        if (errorMessage) {
          throw new Error(errorMessage);
        }

        this.setState(prevState => ({
          addresses: [...prevState.addresses, address],
          ceps: [...prevState.ceps, cep],
        }));

        return address;
      })
      .then(address => this.geocodeAddress(address))
      .catch(error => this.setState({errorMessage: error.message}))
      .finally(() => this.setState({searching: false}));
  }

  geocodeAddress = ({uf, localidade, logradouro = ''}) => {
    const url = `https://nominatim.openstreetmap.org/search/br/${uf}/${localidade}/${logradouro}?format=json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.length) {
          // TODO: Handle position not found
          return
        }

        const {lat, lon} = data[0];
        this.setState({latitude: lat, longitude: lon, zoom: 16});
      });
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
        <p>{this.state.errorMessage}</p>
        <SearchForm
          currentCep={this.state.currentCep}
          formValidity={this.state.formValidity}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searching={this.state.searching}
        />

        <OpenStreetMap
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          zoom={this.state.zoom}
        />
      </div>
    );
  }
}

export default App;
