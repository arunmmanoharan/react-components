import React, { FunctionComponent } from 'react';
import {
  Box,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { camelCase } from 'lodash';
import { Close, OpenInNew } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Flex } from '../Flex';

export enum DrawerSize {
  SMALL = '360px',
  STANDARD = '50%',
  MEDIUM = '70%',
  LARGE = '90%',
}

export interface SideDrawerTitleProps extends Pick<SideDrawerProps, 'popout' | 'secondaryDrawerActions'> {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export const DrawerTitle: FunctionComponent<SideDrawerTitleProps> = (props) => {
  const { children, onClose, secondaryDrawerActions, ...other } = props;

  return (
    <MuiDialogTitle
      sx={{
        m: 0,
        p: 2,
      }}
      {...other}
    >
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h6">{children}</Typography>
        </Box>
        {secondaryDrawerActions && (
          <>
            {secondaryDrawerActions}
            <Divider flexItem orientation="vertical" />
          </>
        )}
        {props.popout?.hasPopout ? (
          <Flex>
            <IconButton
              aria-label="Popout"
              component={RouterLink}
              to={props.popout?.popoutURL as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNew />
            </IconButton>
            <Divider flexItem orientation="vertical" />
          </Flex>
        ) : null}
        {onClose ? (
          <Box>
            <IconButton aria-label="close" onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </MuiDialogTitle>
  );
};

export interface SideDrawerProps extends DrawerProps {
  /**
   * Content of the dialog
   */
  children: React.ReactNode;
  /**
   * Side from which the drawer will appear.
   * Default to right
   */
  anchor?: 'bottom' | 'left' | 'right' | 'top';
  /**
   * Open state of the drawer
   */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: () => void;
  /**
   * Title of the drawer
   */
  title: string;
  size?: string | DrawerSize;
  popout?: {
    hasPopout: boolean;
    popoutURL: string;
  };
  secondaryDrawerActions?: React.ReactNode;
}

export const SideDrawer: FunctionComponent<SideDrawerProps> = ({
  children,
  anchor = 'right',
  open,
  onClose,
  title,
  size = DrawerSize.STANDARD,
  popout,
  secondaryDrawerActions,
}) => {
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  if (popout?.hasPopout && !popout?.popoutURL) throw new Error('popoutURL is required since hasPopout is set to true');

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: isMdUp ? size : '100%',
        },
      }}
    >
      <DrawerTitle
        id={`${camelCase(title)}-id`}
        onClose={onClose}
        popout={popout}
        secondaryDrawerActions={secondaryDrawerActions}
      >
        {title}
      </DrawerTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Drawer>
  );
};
