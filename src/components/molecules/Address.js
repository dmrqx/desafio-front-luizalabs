import React from 'react';
import { AddressTitle } from '../atoms/AddressTitle';
import { AddressLine } from '../atoms/AddressLine';

export const Address = ({title, lines}) => (
  <div>
    <AddressTitle text={title} />
    {lines.map((line, index) =>
      <AddressLine
        key={index}
        addMargin={line.addMargin}
        text={line.text}
      />)}
  </div>
);
