import React, { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { FunctionComponent } from 'react';

export const Flex: FunctionComponent<PropsWithChildren> = (props) => {
  return <Box sx={{ display: 'flex' }} {...props} />;
};
