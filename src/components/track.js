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
      await startProximityObserver(setDetected, detected);
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
      stopProximityObserver();
    };
  }, []);

  const goToDetails = (id) => {
    navigation.navigate('Panel Details', {id});
  };

  const detectedIds = detected.map((item) => item.id);
  const detectedPanels = items.filter((item) => detectedIds.includes(item.id));

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
        data={detectedPanels}
        renderItem={({item}) => (
          <Pressable onPress={() => goToDetails(item.id)}>
            <SolarItemText>{item.name}</SolarItemText>
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

export const SolarItemText = styled.Text`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
  border-width: 1px 
  border-top-color:#00e0ff;
  height: 100px;
  font-size: 18px;
  color: #00e0ff;
`;

export const IsTrackingText = styled.Text`
  font-size: 30px;
  color: #00e0ff;
`;

export default Track;
