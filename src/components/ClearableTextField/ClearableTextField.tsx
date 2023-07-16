import React, { FunctionComponent, useCallback, useState } from 'react';
import { omit, trimStart } from 'lodash';

import { IconButton, InputAdornment, OutlinedTextFieldProps, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';

export interface ClearableTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'> {
    id: string;
    onHandleChange: (value: string) => void;
    rightElement?: JSX.Element;
    hasError?: boolean;
    errorMessage?: string;
    maxLength?: number;
    handleFocus?: () => void;
    handleBlur?: () => void;
    showCharactersCount?: boolean;
    charactersCountText?: true extends (this['showCharactersCount'] | undefined) ? string | React.ReactNode : never;
}


export const ClearableTextField: FunctionComponent<ClearableTextFieldProps> = ({
    id, onHandleChange, rightElement, hasError, errorMessage, maxLength, handleFocus, handleBlur, ...props
                                                                               }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const clearInput = (): void => {
    onHandleChange('');
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    onHandleChange(maxLength ? trimStart(e.target.value.substring(0, maxLength)) : e.target.value);
  }, []);

  // @ts-ignore
  return (
    <TextField
      fullWidth
      {...omit(props, [
        'onHandleChange',
        'rightElement',
        'showCharactersCount',
        'charactersCountText',
        'hasError',
        'errorMessage',
        'handleFocus',
        'handleBlur',
      ])}
      onFocus={() => {
        setIsFocused(true);
        if (handleFocus) {
          handleFocus();
        }
      }}
      onBlur={() => {
        setIsFocused(false);
        if (handleBlur) {
          handleBlur();
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {rightElement}
            <IconButton aria-label="clear input" onClick={clearInput} edge="end">
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      error={hasError}
      helperText={(() => {
        if (maxLength && isFocused) {
          return `${maxLength - (props.value as string).length} characters left`;
        }
        if (hasError) {
          return errorMessage;
        }

        return '';
      })()}
    />
  );
};
