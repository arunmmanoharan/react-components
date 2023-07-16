import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { SvgIconProps } from '@mui/material';

export interface DownloadButtonProps extends IconButtonProps {
  fontSize?: SvgIconProps['fontSize'];
}
export const DownloadButton: FunctionComponent<DownloadButtonProps> = (props) => {
  const { fontSize, ...rest } = props;

  return (
    <IconButton {...rest}>
      <CloudDownloadIcon fontSize={fontSize} />
    </IconButton>
  );
};
