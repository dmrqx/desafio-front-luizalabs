import React from 'react';
import { AddressLine, AddressTitle } from '../atoms';

export const Address = ({title, lines}) => (
  <div className='mb__20'>
    <AddressTitle text={title} />
    {lines.map((line, index) =>
      <AddressLine
        key={index}
        addMargin={line.addMargin}
        text={line.text}
      />)}
  </div>
);
