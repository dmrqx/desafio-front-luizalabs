import React from 'react';

import { SearchInput } from './SearchInput';
import { SearchSubmit } from './SearchSubmit';

import styles from './SearchForm.module.css';

export const SearchForm = (props) => {

  const isValid = props.formValidity;
  const isSearching = props.searching;

  return (
    <form className={styles.container}
      onSubmit={(e) => props.handleSubmit(e, props.currentCep)}
    >
      <h1>Consultar</h1>
      <div className={styles.formgroup}>
        <SearchInput handleChange={props.handleChange}
          value={props.currentCep} />
        <SearchSubmit disabled={!isValid || isSearching}
          searching={isSearching} />
      </div>
    </form>
    )
}
