import React, {Fragment} from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
const {height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const onPress = () => {
    console.log('Track pressed');
    navigation.navigate('Track');
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
            <Button transparent title="Start tracking" onPress={onPress} />
            <Button transparent title="Load offline data" />
          </>
        </ButtonWrapper>
      </Wrapper>
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
  letter-spacing: 3;
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
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${(props) => (props.transparent ? 'transparent' : '#f3f8ff')};
 padding:15px;
border:${(props) => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${(props) => (props.transparent ? '#f3f8ff ' : '#666')};
`;

export const Button = ({onPress, color, ...props}) => {
  return (
    <StyledButton {...props} onPress={onPress}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};

export default Home;
