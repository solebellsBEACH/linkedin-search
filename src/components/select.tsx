import React, { forwardRef } from "react"
import "./components.css"

type SelectProps = {
  label: string
  value?: string
  onChange?: (val: string) => void
  children: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, value, onChange, children, ...rest }, ref) => (
    <label className="label">
      {label}
      <select
        ref={ref}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="input"
        {...rest}
      >
        {children}
      </select>
    </label>
  )
)

Select.displayName = "Select"
