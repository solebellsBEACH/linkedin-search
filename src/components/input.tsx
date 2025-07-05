import React, { forwardRef, HTMLInputTypeAttribute } from "react"
import "./components.css"

type InputProps = {
  label: string
  value?: any
  onChange?: (val: any) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, value, onChange, placeholder, type = "text", ...rest }, ref) => (
    <label className="label">
      {label}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="input"
        {...rest}
      />
    </label>
  )
)

Input.displayName = "Input"
