import React, { useEffect, useState, useCallback } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { IStationData } from './types';
import {
  StationMarker,
  NewStationModal,
  EditStationModal,
  AddStationButton,
} from './components';
import { StationsApi } from './services';

const DEFAUL_MAP_LOCATION: LatLngTuple = [
  47.374452807882726, 8.541715335404188,
]; // Render the map at Zurich city center

const App = () => {
  const [choosingLocation, setChoosingLocation] = useState(false);
  const [editingStation, setEditingStation] = useState<IStationData>();
  const [stations, setStations] = useState<Array<IStationData>>([]);
  const addStation = () => setChoosingLocation(true);

  const loadStations = useCallback(() => {
    (async () => {
      const stations = await StationsApi.getAllStations();
      setStations(stations);
    })();
  }, []);

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  const newStationHandler = (station?: IStationData) => {
    setChoosingLocation(false);
    if (station) {
      StationsApi.createStation(station).then(loadStations);
    }
  };

  const editStationHandler = (station?: IStationData, remove = false) => {
    setEditingStation(undefined);
    if (!station?.id) {
      return;
    }
    if (remove) {
      StationsApi.deleteStation(station.id).then(loadStations);
    } else {
      StationsApi.modifyStation(station).then(loadStations);
    }
  };

  return (
    <NextUIProvider>
      <AddStationButton
        choosingLocation={choosingLocation}
        onPress={addStation}
      />
      <MapContainer
        center={DEFAUL_MAP_LOCATION}
        zoom={15}
        scrollWheelZoom={true}
      >
        <>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />
          {stations.map((station) => (
            <StationMarker
              key={station.id}
              station={station}
              onClick={() => setEditingStation(station)}
            />
          ))}
          {choosingLocation && <NewStationModal onFinish={newStationHandler} />}
          {editingStation && (
            <EditStationModal
              station={editingStation}
              onFinish={editStationHandler}
            />
          )}
        </>
      </MapContainer>
    </NextUIProvider>
  );
};

export default App;
