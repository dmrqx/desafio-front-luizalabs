import React from 'react';
import { Button } from '../atoms/Button';

export const SearchSubmit = ({disabled, searching}) => {
  let handleClick = null;
  if (disabled) {
    handleClick = (event) => {
      event.preventDefault();
      // TODO: Handle empty submit
    }
  }
  return (
    <Button disabled={disabled} handleClick={handleClick}>
      {searching ? 'Buscando' : 'Buscar'}
    </Button>
  );
}