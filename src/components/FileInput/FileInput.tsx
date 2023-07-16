import React, { ChangeEvent, FunctionComponent } from 'react';
import { Button, FormControl, InputAdornment, OutlinedInput, Tooltip } from '@mui/material';

export interface FileInputProps {
  /**
   * The file object to be worked with
   */
  file?: File | null;
  /**
   * The file types to accept
   * @default '*' - all file types
   * @example '.pdf' - only pdf files
   * @example '.pdf, .doc' - pdf and doc files
   * @example '.pdf, .doc, image/*' - pdf, doc and image files
   * @example 'image/*' - only image files
   * @example 'video/*' - only video files
   * @example 'audio/*' - only audio files
   * Please note that the file types are case sensitive and should always start with a dot
   */
  accept?: string;
  /**
   * The function to be called when the file input changes
   * @param event
   */
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: FunctionComponent<FileInputProps> = ({ handleChange, file, accept }) => {
  const renderFileInput = () => (
    <Button variant="text" component="label" size="small">
      Browse
      <input hidden accept={accept || '*'} multiple type="file" onChange={handleChange} />
    </Button>
  );

  return (
    <FormControl sx={{ width: '100%' }}>
      <Tooltip title={file && file.name} arrow>
        <OutlinedInput
          value={file && file.name}
          placeholder="Select a file"
          fullWidth
          onChange={handleChange}
          aria-describedby="file-upload-input"
          endAdornment={<InputAdornment position="end">{renderFileInput()}</InputAdornment>}
          size="small"
          sx={{
            '& .TrinityInputBase-input': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
          readOnly
        />
      </Tooltip>
    </FormControl>
  );
};
