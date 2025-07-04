import React, { HTMLInputTypeAttribute } from "react"
import "./components.css"

export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type
}: {
  label: string
  value: any
  onChange: (val: any) => void
  placeholder?: string,
  type?:HTMLInputTypeAttribute
}) => (
  <label className="label">
    {label}
    <input
      type={type || "text"}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  </label>
)
