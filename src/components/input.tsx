import { TextField } from '@mui/material';
import React, { forwardRef, HTMLInputTypeAttribute } from 'react';

type InputProps = {
  label: string;
  value?: any;
  onChange?: (val: any) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, onChange, placeholder, type = 'text', color = 'primary', ...rest }, ref) => (
    <TextField
      fullWidth
      label={label}
      value={value}
      inputRef={ref}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      type={type}
      variant="outlined"
      color={color}
    />
  )
);

Input.displayName = 'Input';
