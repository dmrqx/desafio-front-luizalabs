import React, { Component } from 'react';
import { ViaCepLookup } from './viaCepLookup';


export class CepInput extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lastSubmitted: '',
      searching: false,
      unmaskedValue: '',
      validity: false,
      value: '',
    };

    this.resetInputState = {
      unmaskedValue: '',
      validity: false,
      value: '',
    }
  }

  applyCepMask = (value) => {
    return value.length <= 5
      ? value
      : `${value.slice(0,5)}-${value.slice(5)}`
  }

  customValidation = (value) => {
    if (Array.from(value).every(digit => digit === value[0])) {
      this.setState({validity: false});
      this.props.onError('CEP digitado não é válido');
    }

    if(value === this.state.lastSubmitted) {
      this.setState({validity: false});
      this.props.onError('Busque um CEP diferente do anterior')
    }
  }

  handleChange = ({target}) => {
    const unmaskedValue = target.value.replace(/\D/g, '');

    this.setState({
      unmaskedValue: unmaskedValue,
      validity: target.validity.valid,
      value: this.applyCepMask(unmaskedValue),
    });

    if (unmaskedValue.length === 8) {
      this.customValidation(unmaskedValue);
    }
  }

  handleSubmit = () => {
    this.setState({searching: true});
    const viaCep = new ViaCepLookup();
    viaCep.queryCep(this.state.unmaskedValue).then(res => {
      this.setState({lastSubmitted: this.state.unmaskedValue, searching: false, ...this.resetInputState});
      if (res.address) {
        this.props.onSuccess(res.address)
      }
    })
  }

  render() {
    const canSubmit = this.state.validity;
    const searching = this.state.searching;

    return (
      <div>
        <input
          maxLength="9"
          minLength="9"
          pattern="\d{5}-\d{3}"
          required
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button
          disabled={!canSubmit || searching}
          onClick={this.handleSubmit}
        >
          {searching ? 'Buscando' : 'Buscar'}
        </button>
      </div>
      )
    }
  }