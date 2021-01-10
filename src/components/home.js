import React, {useState, useEffect, useRef} from 'react';

import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  LogBox,
} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import ProgressBar from './progressBar';
import Toast from 'react-native-toast-message';
import Button from './button';

LogBox.ignoreAllLogs();  // TODO: for demo purpose only

const {height} = Dimensions.get('window');
export const PROGRESS_BAR_HEIGHT = 150;

const Home = ({navigation}) => {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const toggleHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(toggleHeight, {
      toValue: showProgressBar ? PROGRESS_BAR_HEIGHT : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [showProgressBar]);

  const onTrackingPress = () => {
    navigation.navigate('Track');
  };

  const onLoadOfflinePress = () => {
    setShowProgressBar(true);
  };

  const onDataLoaded = () => {
    setShowProgressBar(false);
    Toast.show({
      text1: 'Offline data have been cached',
    });
  };

  return (
    <View>
      <Video
        source={require('./../assets/intro.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
      />
      <Wrapper>
        <Logo
          source={require('./../assets/logo.png')}
          width={50}
          height={50}
          resizeMode="contain"
        />
        <Title>Solar Farm Tool</Title>
        <TextDescription>
          Track solar panel to inspect their current status
        </TextDescription>
        <ButtonWrapper>
          <>
            <Button
              transparent
              title="Start tracking"
              onPress={onTrackingPress}
            />
            <Button
              transparent
              title="Load offline data"
              onPress={onLoadOfflinePress}
            />
          </>
        </ButtonWrapper>
      </Wrapper>
      <Animated.View style={[styles.subView, {height: toggleHeight}]}>
        {showProgressBar && <ProgressBar callback={onDataLoaded} />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  subView: {
    position: 'absolute',
    bottom: -PROGRESS_BAR_HEIGHT,
    left: 0,
    right: 0,
    height: 0,
  },
});

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3px;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 50% 0px 20px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

export default Home;
