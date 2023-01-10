import React, { useState } from 'react';
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { IStationData } from '../types/IStationData';
import { StationDataModal } from './StationDataModal';
import { GeocodeApi } from '../services';

export const NewStationModal = (props: {
  onFinish: (station?: IStationData, remove?: boolean) => void;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [city, setCity] = useState<string | undefined>();
  const [street, setStreet] = useState<string | undefined>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useMapEvents({
    // The hook install an onClick handler to map which opens new station modal with prefilled coordinates
    click(e: L.LeafletMouseEvent) {
      const formattedLatitude = parseFloat(e.latlng.lat.toFixed(6));
      const formattedLongitude = parseFloat(e.latlng.lng.toFixed(6));
      setLatitude(formattedLatitude);
      setLongitude(formattedLongitude);
      GeocodeApi.reverse(formattedLatitude, formattedLongitude)
        .then((res) => {
          setCity(res.city);
          setStreet(res.street);
        })
        .finally(() => setVisible(true));
    },
  });

  return visible ? (
    <StationDataModal
      station={{ latitude, longitude, city, street }}
      onFinish={(data: IStationData | undefined) => {
        setVisible(false);
        props.onFinish(data);
      }}
    />
  ) : null;
};
