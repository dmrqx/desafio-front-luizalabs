import React from 'react';
import styles from './SearchInput.module.css';
import { applyMask } from '../utils/searchInputHelpers';

export const SearchInput = (props) => (
  <input
    className={styles.default}
    maxLength="9"
    minLength="9"
    pattern="\d{5}-\d{3}"
    required
    type="search"
    value={applyMask(props.value)}
    onChange={props.handleChange} />
);
