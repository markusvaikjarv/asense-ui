import React from 'react';
import { Button } from '@nextui-org/react';
import styled from 'styled-components';

const AddStationButtonContainer = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  margin: 20px;
`;

export const AddStationButton = (props: {
  choosingLocation: boolean;
  onPress: () => void;
}) => {
  return (
    <AddStationButtonContainer>
      <Button
        size={'xl'}
        disabled={props.choosingLocation}
        shadow
        auto
        onPress={props.onPress}
      >
        {!props.choosingLocation ? 'Add station' : 'Click on the location'}
      </Button>
    </AddStationButtonContainer>
  );
};
