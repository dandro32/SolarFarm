import React, {useContext, useEffect} from 'react';
import {FlatList, Text, View, Pressable, LogBox} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import styled from 'styled-components/native';
import {AppContext} from '../state/context';

const Track = () => {

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    return () => {};
  }, []);

  const {items} = useContext(AppContext);
  const goToDetails = (id) => {
    console.log({id});
  };

  return (
    <TrackView>
      <IsTrackingWrapper>
        <IsTrackingText>Tracking</IsTrackingText>
        <AnimatedEllipsis
          style={{
            color: '#00e0ff',
            fontSize: 40,
          }}
        />
      </IsTrackingWrapper>
      <FlatListWrapper
        data={items}
        renderItem={({item}) => (
          <Pressable onPress={() => goToDetails(item.id
          )}>
            <SolarItem>
              <SolarItemText>{item.name}</SolarItemText>
              <SolarItemText>{item.distance}m</SolarItemText>
            </SolarItem>
          </Pressable>
        )}
      />
    </TrackView>
  );
};

export const TrackView = styled.View`
  background: #3d5875;
`;

export const IsTrackingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const FlatListWrapper = styled.FlatList``;

export const SolarItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-width: 1px 
  border-top-color:#00e0ff;
`;

export const SolarItemText = styled.Text`
  font-size: 18;
  color: #00e0ff;
`;

export const IsTrackingText = styled.Text`
  font-size: 30;
  color: #00e0ff;
`;

export default Track;
