// src/components/Select.tsx
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent,
} from '@mui/material';
import React, { forwardRef } from 'react';

type SelectProps = {
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  children: React.ReactNode;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, value = '', onChange, children }, ref) => (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <MUISelect
        inputRef={ref}
        value={value}
        label={label}
        onChange={(e: SelectChangeEvent<string>) => {
          if (onChange) onChange(e.target.value);
        }}
      >
        {/* Transformar <option> em <MenuItem> */}
        {React.Children.map(children, child => {
          if (
            React.isValidElement(child) &&
            typeof child.props.value === 'string'
          ) {
            return (
              <MenuItem value={child.props.value}>
                {child.props.children}
              </MenuItem>
            );
          }
          return null;
        })}
      </MUISelect>
    </FormControl>
  )
);

Select.displayName = 'Select';
