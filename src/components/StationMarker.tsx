import React from 'react';
import L, { LeafletEventHandlerFn } from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { IStationData } from '../types/IStationData';

export const StationMarker = (props: {
  onClick: LeafletEventHandlerFn;
  station: IStationData;
}) => {
  // Manual icon setup required with Webpack & react-leaflet combination
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  return (
    <Marker
      eventHandlers={{ click: props.onClick }}
      position={[props.station.latitude, props.station.longitude]}
    >
      <Tooltip
        offset={[0, 20]} // Aligns the tooltip pointer with the middle of marker icon
        direction="left"
      >
        Station: {props.station.name}
        <br />
        {props.station?.pumps?.GAS_95?.active &&
        props.station?.pumps?.GAS_95?.price ? (
            <>
            Gasoline 95: {props.station?.pumps?.GAS_95?.price} CHF <br />
            </>
          ) : null}
        {props.station?.pumps?.GAS_98?.active &&
        props.station?.pumps?.GAS_98?.price ? (
            <>
            Gasoline 98: {props.station?.pumps?.GAS_98?.price} CHF <br />
            </>
          ) : null}
        {props.station?.pumps?.DIESEL?.active &&
        props.station?.pumps?.DIESEL?.price ? (
            <>
            Diesel: {props.station?.pumps?.DIESEL?.price} CHF <br />
            </>
          ) : null}
      </Tooltip>
    </Marker>
  );
};
