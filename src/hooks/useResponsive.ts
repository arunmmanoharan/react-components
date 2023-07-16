import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export interface IBreakpointsType {
  isMobile: boolean;
  isTablet: boolean;
  isSmallLaptop: boolean;
  isLargeLaptop: boolean;
  isDesktop: boolean;
  isComputer: boolean;
  isLaptop: boolean;
}

export const useResponsive = (): IBreakpointsType => {
  const theme = useTheme();
  const isClient = typeof window !== 'undefined'; // Check if running in the browser

  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isClient) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isClient]);

  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.values.sm });
  const isTablet = useMediaQuery({
    minWidth: theme.breakpoints.values.sm + 1,
    maxWidth: theme.breakpoints.values.md,
  });
  const isSmallLaptop = useMediaQuery({
    minWidth: theme.breakpoints.values.md + 1,
    maxWidth: theme.breakpoints.values.lg,
  });
  const isLargeLaptop = useMediaQuery({
    minWidth: theme.breakpoints.values.lg + 1,
    maxWidth: theme.breakpoints.values.xl,
  });
  const isDesktop = useMediaQuery({ minWidth: theme.breakpoints.values.xl + 1 });
  const isComputer = useMediaQuery({ minWidth: theme.breakpoints.values.lg });
  const isLaptop = useMediaQuery({
    minWidth: theme.breakpoints.values.md + 1,
    maxWidth: theme.breakpoints.values.xl,
  });

  // Calculate breakpoints based on windowWidth during SSR
  if (!isClient) {
    const breakpoints = {
      isMobile: false,
      isTablet: false,
      isSmallLaptop: true,
      isLargeLaptop: true,
      isDesktop: false,
      isComputer: true,
      isLaptop: true,
    };

    if (windowWidth) {
      breakpoints.isMobile = windowWidth <= theme.breakpoints.values.sm;
      breakpoints.isTablet =
          windowWidth > theme.breakpoints.values.sm &&
          windowWidth <= theme.breakpoints.values.md;
      breakpoints.isSmallLaptop =
          windowWidth > theme.breakpoints.values.md &&
          windowWidth <= theme.breakpoints.values.lg;
      breakpoints.isLargeLaptop =
          windowWidth > theme.breakpoints.values.lg &&
          windowWidth <= theme.breakpoints.values.xl;
      breakpoints.isDesktop = windowWidth > theme.breakpoints.values.xl;
      breakpoints.isComputer = windowWidth >= theme.breakpoints.values.lg;
      breakpoints.isLaptop =
          windowWidth > theme.breakpoints.values.md &&
          windowWidth <= theme.breakpoints.values.xl;
    }

    return breakpoints;
  }

  return {
    isMobile,
    isTablet,
    isSmallLaptop,
    isLargeLaptop,
    isDesktop,
    isComputer,
    isLaptop,
  };
};
