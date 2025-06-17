import React from "react"
import "./components.css"

export const Select = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  children: React.ReactNode
}) => (
  <label className="label">
    {label}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="input"
    >
      {children}
    </select>
  </label>
)
