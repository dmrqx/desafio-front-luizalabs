import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = new L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [10, 46],
});

export const OpenStreetMap = ({latitude, longitude, zoom = 4}) => {
  const lat = latitude || -10.3333,
        lon = longitude || -53.2,
        position = [lat, lon];

  return (
    <Map center={position} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png'
      />
      <Marker icon={DefaultIcon} position={position} />
    </Map>
  );
}
