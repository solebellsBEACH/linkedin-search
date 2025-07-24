import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ label, value, onChange, children }: SelectProps) {
  // Converter options de children
  const options = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      return {
        label: child.props.children,
        value: child.props.value
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <Autocomplete
      value={options.find(option => option.value === value) || null}
      onChange={(_, newValue) => {
        onChange(newValue?.value || '');
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          fullWidth
        />
      )}
      disableClearable
      ListboxProps={{
        style: { maxHeight: '200px' }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          }
        }
      }}
    />
  );
}
