import React from "react"
import "../app.css"

export const Input = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
}) => (
  <label className="label">
    {label}
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  </label>
)
