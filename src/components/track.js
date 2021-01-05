import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View, Pressable, LogBox} from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import styled from 'styled-components/native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

import {AppContext} from '../state/context';
import {startProximityObserver, stopProximityObserver} from '../state/beacons';

const Track = ({navigation}) => {
  const [isTracking, setIsTracking] = useState(false);
  const {items} = useContext(AppContext);
  const [detected, setDetected] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);
    return () => {};
  }, []);

  useEffect(() => {
    const initTracking = async () => {
      await startProximityObserver(setDetected);
      BluetoothStateManager.onStateChange((bluetoothState) => {
        if (bluetoothState === 'PoweredOn') {
          setIsTracking(true);
        } else {
          setIsTracking(false);
          setDetected([]);
        }
      }, true);
    };
    initTracking();

    return () => {
      console.log('is unmounting')
      stopProximityObserver();
    };
  }, []);

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
  flex: 1;
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
  justify-content: space-around;
  padding: 10px 20px;
  border-width: 1px 
  border-top-color:#00e0ff;
  height: 100px;
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
