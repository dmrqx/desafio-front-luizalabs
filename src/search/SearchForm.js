import React, { Component } from 'react';

import { SearchInput } from './SearchInput';
import { SearchSubmit } from './SearchSubmit';
import { removeMask } from '../utils/searchInputHelpers';

import styles from './SearchForm.module.css';

const initialState = {
  validity: false,
  value: '',
};

export class SearchForm extends Component {
  constructor (props) {
    super(props);
    this.state = initialState;
  }

  handleChange = ({target}) => {
    this.setState({
      value: removeMask(target.value),
      validity: target.validity.valid,
    });
  }

  render() {
    const isValid = this.state.validity;
    const isSearching = this.props.searching;

    return (
      <form className={styles.container} onSubmit={(e) => this.props.handleSubmit(e, this.state.value)}>
        <h1>Consultar</h1>
        <div className={styles.formgroup}>
          <SearchInput handleChange={this.handleChange}
            value={this.state.value} />
          <SearchSubmit disabled={!isValid || isSearching}
            searching={isSearching} />
        </div>
      </form>
    )
  }
}
