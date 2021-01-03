import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import styled from 'styled-components/native';
import {AppContext} from '../state/context';

const Track = () => {
  const {items} = useContext(AppContext);

  return (
    <TrackView>
      <IsTrackingWrapper>
        <IsTrackingText>
          Tracking
          <AnimatedEllipsis
            style={{
              color: '#00e0ff',
              fontSize: 40,
            }}
          />
        </IsTrackingText>
      </IsTrackingWrapper>
      <FlatListWrapper
        data={items}
        renderItem={({item}) => <SolarItem>{item.name}</SolarItem>}
      />
    </TrackView>
  );
};

export const TrackView = styled.View`
  background: #3d5875;
`;

export const IsTrackingWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const FlatListWrapper = styled.FlatList``;

export const SolarItem = styled.Text`
  color: #00e0ff;
`;

export const IsTrackingText = styled.Text`
  font-size: 30;
  color: #00e0ff;
`;

export default Track;
