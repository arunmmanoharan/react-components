import React, { FunctionComponent } from 'react';
import { Box, LinearProgress, LinearProgressProps } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const stripes = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

const BorderLinearProgress = styled(LinearProgress)((props) => {
  return {
    height: 8,
    borderRadius: 5,
    backgroundImage: `repeating-linear-gradient(-45deg,hsla(0,0%,100%,.2) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.2) 0,hsla(0,0%,100%,.2) 75%,transparent 0)`,
    backgroundSize: `30px 30px`,
    animation: `${stripes} 8s linear infinite`,
    backgroundColor: `${props.color}66`,
  };
});

export interface LinearProgressBarProps extends LinearProgressProps {}

export const LinearProgressBar: FunctionComponent<LinearProgressBarProps> = (props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <BorderLinearProgress {...props} />
    </Box>
  );
};
