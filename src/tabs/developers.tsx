import React, { useState } from "react"
import { Select } from "../components/select"
import { Input } from "../components/input"

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

export function DevelopersTab() {
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
    <>
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

    <button onClick={handleSearch} className="button">
      Buscar no LinkedIn
    </button>
    </>
  )
}
