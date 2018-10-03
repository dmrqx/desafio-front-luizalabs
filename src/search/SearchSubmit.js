import React from 'react';

export const SearchSubmit = ({disabled, searching}) => (
  <button disabled={disabled}>
    {searching ? 'Buscando' : 'Buscar'}
  </button>
);
