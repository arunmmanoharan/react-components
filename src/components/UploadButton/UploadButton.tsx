import React, { FunctionComponent } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SvgIconProps } from '@mui/material';

export interface UploadButtonProps extends IconButtonProps {
  fontSize?: SvgIconProps['fontSize'];
}
export const UploadButton: FunctionComponent<UploadButtonProps> = (props) => {
  const { fontSize, ...rest } = props;

  return (
    <IconButton {...rest}>
      <CloudUploadIcon fontSize={fontSize} />
    </IconButton>
  );
};
