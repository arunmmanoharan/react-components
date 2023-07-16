import React, { FunctionComponent, ReactElement, useState } from 'react';
import { Box, ClickAwayListener, Fade, Paper, Popper, PopperPlacementType } from '@mui/material';
import { noop, uniqueId } from 'lodash';
import { styled } from '@mui/material/styles';
import { bindPopper, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';

const PopperWithArrow = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.tooltip,
  '&[data-popper-placement*="bottom"] .MuiPopper-arrow': {
    top: 0,
    left: 0,
    marginTop: '-0.71em',
    marginLeft: 4,
    marginRight: 4,
    '&::before': {
      transformOrigin: '0 100%',
    },
  },
  '&[data-popper-placement*="top"] .MuiPopper-arrow': {
    bottom: 0,
    left: 0,
    marginBottom: '-0.71em',
    marginLeft: 4,
    marginRight: 4,
    '&::before': {
      transformOrigin: '100% 0',
    },
  },
  '&[data-popper-placement*="right"] .MuiPopper-arrow': {
    left: 0,
    marginLeft: '-0.71em',
    height: '1em',
    width: '0.71em',
    marginTop: 4,
    marginBottom: 4,
    '&::before': {
      transformOrigin: '100% 100%',
    },
  },
  '&[data-popper-placement*="left"] .MuiPopper-arrow': {
    right: 0,
    marginRight: '-0.71em',
    height: '1em',
    width: '0.71em',
    marginTop: 4,
    marginBottom: 4,
    '&::before': {
      transformOrigin: '0 0',
    },
  },
}));

export interface StyledPopperProps {
  content: ReactElement;
  children: ReactElement;
  onClose?: (event: MouseEvent | TouchEvent) => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
  useContentPadding?: boolean;
  disabled?: boolean;
  id: string;
}

export const StyledPopper: FunctionComponent<StyledPopperProps> = ({
  placement = 'bottom',
  arrow = true,
  onClose = noop,
  content,
  children,
  useContentPadding = true,
  disabled = false,
  id,
}) => {
  if (!id) {
    throw new Error('id is required to maintain uniqueness across poppers');
  }
  const popupState = usePopupState({
    variant: 'popper',
    popupId: uniqueId(id),
  });

  const [arrowRef, setArrowRef] = useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = useState<HTMLElement | null>(null);

  return (
    <>
      {React.cloneElement(children, {
        ...children.props,
        ref: setChildNode,
        disabled,
        ...bindTrigger(popupState),
        style: { pointerEvents: 'auto', cursor: 'pointer' },
      })}
      <PopperWithArrow
        {...bindPopper(popupState)}
        anchorEl={childNode}
        placement={placement}
        transition
        modifiers={[
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener
                onClickAway={(e) => {
                  if (onClose) {
                    onClose(e);
                  }
                  popupState.close();
                }}
              >
                <Paper
                  sx={{
                    backgroundColor: '#E8EDF3',
                    width: '100%',
                  }}
                >
                  {arrow ? (
                    <Box
                      className="MuiPopper-arrow"
                      component="span"
                      sx={{
                        overflow: 'hidden',
                        position: 'absolute',
                        width: '1em',
                        height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
                        boxSizing: 'border-box',
                        color: (theme) => theme.palette.background.paper,
                        '&::before': {
                          content: '""',
                          margin: 'auto',
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          boxShadow: (theme) => theme.shadows[1],
                          backgroundColor: 'currentColor',
                          transform: 'rotate(45deg)',
                        },
                      }}
                      ref={setArrowRef}
                    />
                  ) : null}
                  <Box sx={{ p: useContentPadding ? 2 : 0, width: '100%' }}>{content}</Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </PopperWithArrow>
    </>
  );
};
