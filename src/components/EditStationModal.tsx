import React from 'react';
import { IStationData } from '../types/IStationData';
import { StationDataModal } from './StationDataModal';

export const EditStationModal = (props: {
  station: IStationData;
  onFinish: (station?: IStationData, remove?: boolean) => void;
}) => {
  return <StationDataModal station={props.station} onFinish={props.onFinish} />;
};
