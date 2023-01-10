import React, { useState } from 'react';
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Spacer,
} from '@nextui-org/react';
import styled from 'styled-components';
import { IStationData } from '../types/IStationData';

const PumpActiveCheckbox = styled(Checkbox)`
  margin: 10px 0 0 15px;
`;

// Clean object from properties with null values
const cleanObject = (obj: Record<any, any>): Record<any, any> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [
        key,
        value === Object(value) ? cleanObject(value) : value,
      ])
  );
};

export const StationDataModal = (props: {
  station?: IStationData;
  onFinish: (station?: IStationData, remove?: boolean) => void;
}) => {
  const { station, onFinish } = props;
  const [id] = useState<string | undefined>(station?.id);
  const [city, setCity] = useState<string | undefined>(station?.city);
  const [street, setStreet] = useState<string | undefined>(station?.street);
  const [latitude, setLatitude] = useState<number>(station?.latitude ?? 0);
  const [longitude, setLongitude] = useState<number>(station?.longitude ?? 0);
  const [name, setName] = useState<string | undefined>(station?.name);
  const [g95Price, setG95Price] = useState<number | undefined>(
    station?.pumps?.GAS_95?.price
  );
  const [g98Price, setG98Price] = useState<number | undefined>(
    station?.pumps?.GAS_98?.price
  );
  const [dieselPrice, setDieselPrice] = useState<number | undefined>(
    station?.pumps?.DIESEL?.price
  );
  const [g95Active, setG95Active] = useState<boolean | undefined>(
    station?.pumps?.GAS_95?.active
  );
  const [g98Active, setG98Active] = useState<boolean | undefined>(
    station?.pumps?.GAS_98?.active
  );
  const [dieselActive, setDieselActive] = useState<boolean | undefined>(
    station?.pumps?.DIESEL?.active
  );

  const existingStation = Boolean(station?.id);

  const getData = (): IStationData | void => {
    if (name && latitude && longitude) {
      return cleanObject({
        id,
        name,
        latitude,
        longitude,
        city,
        street,
        pumps: {
          GAS_95: {
            price: g95Price,
            active: g95Active,
          },
          GAS_98: {
            price: g98Price,
            active: g98Active,
          },
          DIESEL: {
            price: dieselPrice,
            active: dieselActive,
          },
        },
      }) as IStationData;
    }
  };

  const modificationHandler = () => {
    const data = getData();
    if (!data) {
      return window.alert(
        'Name and coordinates are required parameters for a station'
      );
    }
    onFinish(data);
  };

  const deleteHandler = () => {
    const data = getData();
    if (data?.id) {
      onFinish(data, true);
    }
  };

  const closeHandler = () => {
    onFinish();
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={true}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {existingStation ? 'Modify the station' : 'Add new station'}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="md"
          placeholder="Name"
          aria-label="Name"
          initialValue={station?.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Row>
          <Input
            bordered
            fullWidth
            type={'number'}
            color="primary"
            size="md"
            placeholder="Price - Gasoline 95"
            aria-label="Price - Gasonile 95"
            initialValue={station?.pumps?.GAS_95?.price?.toString()}
            onChange={(e) => setG95Price(parseFloat(e.target.value))}
          />
          <PumpActiveCheckbox
            color="success"
            defaultSelected={station?.pumps?.GAS_95?.active}
            onChange={setG95Active}
          />
        </Row>
        <Row>
          <Input
            bordered
            fullWidth
            type={'number'}
            color="primary"
            size="md"
            placeholder="Price - Gasoline 98"
            aria-label="Price - Gasoline 98"
            initialValue={station?.pumps?.GAS_98?.price?.toString()}
            onChange={(e) => setG98Price(parseFloat(e.target.value))}
          />
          <PumpActiveCheckbox
            color="success"
            defaultSelected={station?.pumps?.GAS_98?.active}
            onChange={setG98Active}
          />
        </Row>
        <Row>
          <Input
            bordered
            fullWidth
            type={'number'}
            color="primary"
            size="md"
            placeholder="Price - Diesel"
            aria-label="Price - Diesel"
            initialValue={station?.pumps?.DIESEL?.price?.toString()}
            onChange={(e) => setDieselPrice(parseFloat(e.target.value))}
          />
          <PumpActiveCheckbox
            color="success"
            defaultSelected={station?.pumps?.DIESEL?.active}
            onChange={setDieselActive}
          />
        </Row>
        <Spacer y={0.35} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="md"
          labelPlaceholder="City"
          aria-label="City"
          initialValue={station?.city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Spacer y={0.35} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="md"
          labelPlaceholder="Street & number"
          aria-label="Street & number"
          initialValue={station?.street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <Spacer y={0.35} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="md"
          labelPlaceholder="Latitude"
          aria-label="Latitude"
          initialValue={latitude.toString()}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
        />
        <Spacer y={0.35} />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="md"
          labelPlaceholder="Longitude"
          aria-label="Longitude"
          initialValue={longitude.toString()}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
        />
      </Modal.Body>
      <Modal.Footer>
        {existingStation && (
          <Button auto color="error" onPress={deleteHandler}>
            Delete
          </Button>
        )}
        <Button auto color="success" onPress={modificationHandler}>
          {existingStation ? 'Save' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
