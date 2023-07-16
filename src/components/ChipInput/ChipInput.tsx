import React, { FunctionComponent, useEffect } from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { compact, join, map, replace, split, trim, trimStart, without } from 'lodash';
import { useSetState } from '../../hooks/useSetState';

export interface ChipInputProps {
  values: string;
  onHandleChange: (values: string, name: string) => void;
  label?: React.ReactNode;
  helperText?: string;
  name: string;
  acceptOnlyNumbers?: boolean;
  acceptOnlyNumbersPercentage?: boolean;
  separator?: string;
  disabled: boolean;
  chipLimit?: number;
  EndAdornment?: React.ReactNode;
}

interface IChipInputState {
  value: string[];
  inputValue: string;
  isFocused: boolean;
}

export const ChipInput: FunctionComponent<ChipInputProps> = ({
  values,
  onHandleChange,
  label,
  helperText,
  name,
  acceptOnlyNumbers = false,
  acceptOnlyNumbersPercentage = false,
  separator = ',',
  disabled = false,
  chipLimit = Infinity,
  EndAdornment,
}) => {
  const [state, setState] = useSetState<IChipInputState>({
    value: compact(map(split(values, separator), (i) => trim(i))),
    inputValue: values,
    isFocused: false,
  });

  useEffect(() => {
    setState({
      value: compact(map(split(values, separator), (i) => trim(i))),
      inputValue: values,
    });
  }, [values]);

  const deleteChip = (chipValue: string): void => {
    const newChipValues = without(state.value, chipValue);
    setState({
      value: newChipValues,
      inputValue: join(newChipValues, `${separator} `),
      isFocused: false,
    });
    onHandleChange(join(newChipValues, `${separator} `), name);
  };

  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      multiple
      freeSolo
      options={[]}
      size="small"
      open={false}
      forcePopupIcon={false}
      value={state.value}
      onFocus={() => {
        setState({
          isFocused: true,
          inputValue: join(state.value, `${separator} `),
        });
      }}
      onBlur={() => {
        setState({
          isFocused: false,
          value: compact(map(split(state.inputValue, separator), (i) => trim(i))),
          inputValue: '',
        });
      }}
      inputValue={state.isFocused ? state.inputValue : ''}
      onInputChange={(_event, newInputValue) => {
        let onChangeValue = newInputValue;
        const valueArr = compact(split(onChangeValue, ','));
        if (valueArr.length <= chipLimit) {
          if (acceptOnlyNumbers) {
            onChangeValue = replace(newInputValue, /[^\d, ]/, '');
          }
          if (acceptOnlyNumbersPercentage) {
            onChangeValue = replace(newInputValue, /[^\d,% ]/, '');
          }
          onHandleChange(onChangeValue, name);
          setState((prev) => ({
            ...prev,
            inputValue: trimStart(onChangeValue),
          }));
        }
      }}
      clearIcon={null}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          // Prevent's default 'Enter' behavior.
          (event as any).defaultMuiPrevented = true;
          event.preventDefault();
          // your handler code
        }
        if (event.key === separator) {
          setState({
            value: compact(map(split(state.inputValue, separator), (i) => trim(i))),
          });
        }
      }}
      renderTags={(tagValue: string[], getTagProps) => {
        return !state.isFocused ? (
          map(tagValue, (option, index) => {
            return (
              <Chip
                title={option}
                label={option.length > 10 ? `${option.substring(0, 10)}...` : option}
                {...getTagProps({ index })}
                size="small"
                onDelete={() => deleteChip(option)}
              />
            );
          })
        ) : (
          <p />
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: EndAdornment,
          }}
          variant="outlined"
          label={label}
          multiline
          helperText={state.isFocused ? helperText || '' : ''}
        />
      )}
    />
  );
};
