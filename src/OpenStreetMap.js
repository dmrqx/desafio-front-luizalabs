import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

export const OpenStreetMap = ({latitude, longitude, zoom = 4}) => {
  const lat = latitude || -10.3333,
        lon = longitude || -53.2,
        position = [lat, lon];

  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} />
    </Map>
  );
}
