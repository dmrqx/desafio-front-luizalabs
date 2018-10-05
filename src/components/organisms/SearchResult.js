import React from 'react';
import { Address, OpenStreetMap } from '../molecules';

export const SearchResult = ({address, position}) => (
  <div>
    {address &&
      <Address
        title={address.logradouro ? address.logradouro : `${address.localidade} - ${address.uf}`}
        lines={address.logradouro
          ? [{text: address.bairro, addMargin: true}, {text: `${address.localidade} - ${address.uf}`}, {text: address.cep}]
          : [{text: address.cep, addMargin: true}]
        }
      />
    }
    {position &&
      <OpenStreetMap {...position} zoom={address.logradouro ? 16 : 14} />
    }
  </div>
);
