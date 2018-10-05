import React from 'react';
import { InputField } from '../atoms/InputField';

import { applyMask } from '../../utils/searchInputHelpers';

export const SearchInput = (props) => (
  <InputField
    id="cep"
    label="CEP"
    maxLength="9"
    minLength="9"
    name="cep"
    pattern="\d{5}-\d{3}"
    required
    tabIndex="1"
    type="search"
    value={applyMask(props.value)}
    handleChange={props.handleChange}
  />
);
