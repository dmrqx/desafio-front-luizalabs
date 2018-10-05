import React, { Component } from 'react';
import { SearchForm, SearchResult } from './components/organisms';

import { ViaCepLookup } from './utils/viaCepLookup';
import { addItem, lastItem } from './utils/listHelpers';
import { sameDigits, lastSubmitted, removeMask } from './utils/searchInputHelpers';

import './leaflet.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      addresses: [],
      cepList: [],
      currentAddress: null,
      currentCep: '',
      currentPosition: null,
      errorMessage: '',
      formValidity: false,
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

  handleClose = () => {
    this.setState({currentAddress: null, currentPosition: null});
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
          addresses: addItem(prevState.addresses, address),
          cepList: addItem(prevState.cepList, cep),
          currentAddress: {...prevState.currentAddress, ...address}
        }));

        return address;
      })
      .then(address => this.geocodeAddress(address))
      .catch(error => this.setState({errorMessage: error.message}))
      .finally(() => this.setState({searching: false}));
  }

  geocodeAddress({uf, localidade, logradouro = ''}) {
    const url = `https://nominatim.openstreetmap.org/search/br/${uf}/${localidade}/${logradouro}?format=json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.length) {
          // TODO: Handle position not found
          return
        }

        const {lat, lon} = data[0];
        this.setState(prevState => ({
          currentPosition: {
              ...prevState.currentPosition,
              latitude: lat,
              longitude: lon
          }
        }))
      })
  }

  validateCep() {
    if (sameDigits(this.state.currentCep)) {
      this.setState({errorMessage: 'O CEP digitado não é válido', formValidity: false});
    }

    if (lastSubmitted(lastItem(this.state.cepList), this.state.currentCep)) {
      this.setState({errorMessage: 'Você acabou de pesquisar esse CEP. Que memória, hein?', formValidity: false});
    }
  }

  render() {
    const address = this.state.currentAddress,
          position = this.state.currentPosition;

    return (
      <div className='container'>
        <p>{this.state.errorMessage}</p>
        <SearchForm
          currentCep={this.state.currentCep}
          formValidity={this.state.formValidity}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searching={this.state.searching}
        />

        <SearchResult
          address={address}
          position={position}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default App;
