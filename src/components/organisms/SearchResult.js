import React from 'react';

export const SearchResult = ({children}) => !children
  ? <div></div>
  : <div>{children}</div>




//   <Address
//   title={address.logradouro ? address.logradouro : `${address.localidade} - ${address.uf}`}
//   lines={address.logradouro
//     ? [{text: address.bairro, addMargin: true}, {text: `${address.localidade} - ${address.uf}`}, {text: address.cep}]
//     : [{text: address.cep, addMargin: true}]
//   }
// />

// <OpenStreetMap
//   latitude={this.state.latitude}
//   longitude={this.state.longitude}
//   zoom={this.state.zoom}
// />