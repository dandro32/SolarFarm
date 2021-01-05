import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Pressable, LogBox} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import styled from 'styled-components/native';
import {AppContext} from '../state/context';
import {
  startProximityObserver,
  stopProximityObserver
} from './beacons'

const Track = ({navigation}) => {
  const [isTracking, setIsTracking] = useState(false);
  const {items} = useContext(AppContext);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    return () => {};
  }, []);

  useEffect(() => {
    const initTracking = async () => {
      await startProximityObserver();
      setIsTracking(true);
    }
     initTracking()

    return () => {
      stopProximityObserver()
    }
  }, [])


  const goToDetails = (id) => {
    navigation.navigate('Panel Details', {id});
  };

  return (
    <TrackView>
    {isTracking && (
      <IsTrackingWrapper>
      <IsTrackingText>Tracking</IsTrackingText>
      <AnimatedEllipsis
        style={{
          color: '#00e0ff',
          fontSize: 40,
        }}
      />
    </IsTrackingWrapper>


    )}
      <FlatListWrapper
        data={items}
        renderItem={({item}) => (
          <Pressable onPress={() => goToDetails(item.id)}>
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
  font-size: 18px;
  color: #00e0ff;
`;

export const IsTrackingText = styled.Text`
  font-size: 30px;
  color: #00e0ff;
`;

export default Track;
