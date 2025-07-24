import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

interface Option {
  label: string;
  value: string;
}

export function Select({ label, value, onChange, children }: SelectProps) {
  // Converter options de children
  const options = React.Children.toArray(children)
    .filter((child): child is React.ReactElement => React.isValidElement(child) && child.type === 'option')
    .map(child => ({
      label: child.props.children,
      value: child.props.value
    }));

  return (
    <Autocomplete<Option>
      value={options.find(option => option.value === value) || undefined}
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
