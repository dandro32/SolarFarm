import React, {useContext} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import {BarChart} from 'react-native-animated-charts';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

import {AppContext} from '../state/context';
import Button from './button';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#3d5875',
  backgroundGradientFrom: '#3d5875',
  backgroundGradientTo: '#3d5875',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#00e0ff',
  },
};

const StatusRow = ({name, value, warning = false}) => (
  <RowWrapper>
    <Name>{name}: </Name>
    <Value warning={warning}>{value}</Value>
  </RowWrapper>
);

export const RowWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Name = styled.Text`
  font-size: 16;
  color: #00e0ff;
`;

export const Value = styled.Text`
  font-size: 16;
  font-weight: 700;
  color: ${(props) => (props.warning ? 'red' : '#fff')};
`;

const Details = ({route, navigation}) => {
  const {loadDetails} = useContext(AppContext);
  const {id} = route.params;
  const panel = loadDetails(id);
  const {details} = panel;

  const goBack = () => {
    navigation.goBack();
  };

  const markAsChecked = () => {
    Toast.show({
      text1: `${panel.name} was marked as checked`,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DetailsWrapper>
        {!panel && (
          <>
            <Headline>No available data for {id}</Headline>
            <Button transparent blue title="Go back" onPress={goBack} />
          </>
        )}
        {panel && (
          <>
            <Headline>{panel.name} </Headline>
            <StatusRow
              name="Panel Status"
              value={details.status}
              warning={details.status === 'Inactive'}
            />
            <StatusRow name="Time active" value={details.time} />
            <StatusRow name="Producer" value={details.producer} />
            <Voltage>Voltage</Voltage>
            <BarChart
              labels={['1 V', '2 V', '5 V', '10 V']}
              dataY={details.voltage}
              color="#00e0ff"
              height={250}
              containerStyles={{
                backgroundColor: 'transparent',
                height: 240,
                width: screenWidth,
                marginBottom: 20,
                marginTop: 10,
                color: 'white',
              }}
            />

            <LineChart
              data={details.lastYearActivity}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
            <ProgressChart
              data={details.productivity}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
            <MarkCheckedView>
              <Button
                transparent
                blue
                title="Mark as checked"
                onPress={markAsChecked}
              />
            </MarkCheckedView>
          </>
        )}
      </DetailsWrapper>
    </SafeAreaView>
  );
};

export const DetailsWrapper = styled.ScrollView`
  background: #3d5875;
  padding-top: 30px;
`;

export const MarkCheckedView = styled.View`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 30px;
`;

export const Headline = styled.Text`
  font-size: 30;
  color: #00e0ff;
  margin-bottom: 20px;
  text-align: center;
`;

export const Voltage = styled.Text`
  font-size: 18;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

export default Details;
