import React from 'react';
import { Button } from '../components/atoms/Button';

export const SearchSubmit = ({disabled, searching}) => (
  <Button disabled={disabled}>
    {searching ? 'Buscando' : 'Buscar'}
  </Button>
);
