import React, { FunctionComponent } from 'react';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

interface ScrollTopProps {
  children: React.ReactElement;
}

const ScrollTop: FunctionComponent<ScrollTopProps> = (props) => {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 70, right: 25 }}>
        {children}
      </Box>
    </Fade>
  );
};

export const GoToTop = () => {
  return (
    <ScrollTop>
      <Fab size="small" aria-label="scroll back to top" color="secondary">
        <KeyboardArrowUp sx={{ color: 'white' }} />
      </Fab>
    </ScrollTop>
  );
};
