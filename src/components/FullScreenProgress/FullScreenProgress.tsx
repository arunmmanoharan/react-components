import { Box, CircularProgress } from '@mui/material';
import React, { FunctionComponent } from 'react';

export interface FullscreenProgressProps {
  customHeight?: string;
}

export const FullScreenProgress: FunctionComponent<FullscreenProgressProps> = (props) => {
  return (
    <Box
      top="top"
      width="100%"
      height={props.customHeight ? props.customHeight : '100vh'}
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <CircularProgress />
    </Box>
  );
};
