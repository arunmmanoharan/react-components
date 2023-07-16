import React, { FunctionComponent } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export interface ExcelIconProps extends SvgIconProps {}

export const ExcelIcon: FunctionComponent<ExcelIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          clipRule="evenodd"
          d="M28.705,7.506l-5.461-6.333l-1.08-1.254H9.262   c-1.732,0-3.133,1.403-3.133,3.136V7.04h1.942L8.07,3.818c0.002-0.975,0.786-1.764,1.758-1.764l11.034-0.01v5.228   c0.002,1.947,1.575,3.523,3.524,3.523h3.819l-0.188,15.081c-0.003,0.97-0.79,1.753-1.759,1.761l-16.57-0.008   c-0.887,0-1.601-0.87-1.605-1.942v-1.277H6.138v1.904c0,1.912,1.282,3.468,2.856,3.468l17.831-0.004   c1.732,0,3.137-1.41,3.137-3.139V8.966L28.705,7.506"
          fill="#434440"
          fillRule="evenodd"
        />
        <path d="M20.223,25.382H0V6.068h20.223V25.382 M1.943,23.438h16.333V8.012H1.943" fill="#08743B" />
        <polyline
          fill="#08743B"
          points="15.73,20.822 12.325,20.822 10.001,17.538 7.561,20.822 4.14,20.822 8.384,15.486 4.957,10.817    8.412,10.817 10.016,13.355 11.726,10.817 15.242,10.817 11.649,15.486 15.73,20.822  "
        />
      </g>
    </SvgIcon>
  );
};