import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import styled from 'styled-components/native';

const ProgressBar = ({callback}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log({progress});
    if (progress === 100) {
      callback();
    }

    const timeout = setTimeout(() => {
      setProgress(progress + 10);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  return (
    <ProgressBarWrapper>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={progress}
        tintColor="#00e0ff"
        backgroundColor="#3d5875">
        {(fill) => <Percentage>{Math.floor(fill)}%</Percentage>}
      </AnimatedCircularProgress>
    </ProgressBarWrapper>
  );
};

export const ProgressBarWrapper = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Percentage = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

export default ProgressBar;
