import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '& fieldset': {
            borderRadius: 1,
          }
        }
      }}
      {...props}
    />
  );
}
