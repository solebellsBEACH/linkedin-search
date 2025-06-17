import React, { useState } from "react"

const SENIORITY_MAP: Record<string, string[]> = {
  Junior: ["Junior", "JR", "Entry"],
  Pleno: ["Pleno", "Mid", "PL"],
  Senior: ["Senior", "SR"],
}

const CONTENT_KEYWORDS = {
  latam: ["vaga", "contratando", "oportunidade"],
  gringa: ["hiring", "job", "opportunity"],
  all: ["vaga", "contratando", "oportunidade", "hiring", "job", "opportunity"],
}

export default function Popup() {
  const [tab, setTab] = useState("jobs")
  const [tech, setTech] = useState("React")
  const [seniority, setSeniority] = useState("Junior")
  const [tipoVaga, setTipoVaga] = useState("all")

  const buildQuery = () => {
    const techFormatted = tech.trim()
    const seniorities = SENIORITY_MAP[seniority] || [seniority]
    const seniorityQuery = `(${seniorities.map(s => `"${s}"`).join(" OR ")})`

    if (tab === "jobs") {
      if (tech.toLowerCase().includes("front")) {
        return `("Front" OR "Frontend") AND ${seniorityQuery}`
      }
      return `"${techFormatted}" AND ${seniorityQuery}`
    }

    const baseWords = CONTENT_KEYWORDS[tipoVaga as keyof typeof CONTENT_KEYWORDS]
    const pubQuery = `(${baseWords.map(w => `"${w}"`).join(" OR ")})`
    return `${pubQuery} AND "${techFormatted}" AND "${seniorities[0]}"`
  }

  const handleSearch = () => {
    const query = buildQuery()
    const encoded = encodeURIComponent(query)

    const url =
      tab === "jobs"
        ? `https://www.linkedin.com/jobs/search/?currentJobId=&geoId=&keywords=${encoded}&origin=JOBS_HOME_SEARCH_BUTTON&refresh=true`
        : `https://www.linkedin.com/search/results/content/?keywords=${encoded}`

    chrome.tabs.create({ url })
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🔎 Busca no LinkedIn</h3>

      <Select label="Aba:" value={tab} onChange={setTab}>
        <option value="jobs">Vagas</option>
        <option value="content">Publicações</option>
      </Select>

      <Input
        label="Tecnologia:"
        placeholder="React, Frontend..."
        value={tech}
        onChange={setTech}
      />

      <Select label="Senioridade:" value={seniority} onChange={setSeniority}>
        <option value="Junior">Junior</option>
        <option value="Pleno">Pleno</option>
        <option value="Senior">Senior</option>
      </Select>

      {tab === "content" && (
        <Select label="Tipo de vaga:" value={tipoVaga} onChange={setTipoVaga}>
          <option value="all">Todas</option>
          <option value="latam">LATAM</option>
          <option value="gringa">Internacionais</option>
        </Select>
      )}

      <button onClick={handleSearch} style={styles.button}>
        Buscar no LinkedIn
      </button>
    </div>
  )
}

const Input = ({
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
  <label style={styles.label}>
    {label}
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={styles.input}
    />
  </label>
)

const Select = ({
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
  <label style={styles.label}>
    {label}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={styles.input}
    >
      {children}
    </select>
  </label>
)

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 300,
    padding: 20,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7f9fa",
    borderRadius: 8,
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
  label: {
    display: "block",
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginTop: 4,
    fontSize: 13,
  },
  button: {
    width: "100%",
    marginTop: 16,
    padding: 10,
    backgroundColor: "#0072b1",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
}
