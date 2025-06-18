import React, { useState } from "react"
import { Select } from "../components/select"
import { Input } from "../components/input"

const SENIORITY_MAP: Record<string, string[]> = {
  Junior: ["Junior", "JR", "Entry"],
  Pleno: ["Pleno", "Mid", "PL"],
  Senior: ["Senior", "SR"],
  Estágio: ["Estagiário", "Estágio", "Intern"],
}

export function DevelopersTab() {
  const [tab, setTab] = useState("jobs")
  const [tech, setTech] = useState("React")
  const [seniority, setSeniority] = useState("Junior")
  const [regiao, setRegiao] = useState("")
  const [tipoContrato, setTipoContrato] = useState("")

  const buildQuery = () => {
    const techFormatted = tech.trim()
    const regionFormatted = regiao.trim()
    const contractFormatted = tipoContrato.trim()
    const seniorities = SENIORITY_MAP[seniority] || [seniority]

    const techQuery =
      techFormatted.toLowerCase().includes("front")
        ? `("Frontend" OR "Front")`
        : `("${techFormatted}")`

    const seniorityQuery = `(${seniorities.map(s => `"${s}"`).join(" OR ")})`

    const contractQuery = contractFormatted ? `("${contractFormatted}")` : ""
    const regionQuery = regionFormatted ? `("${regionFormatted}")` : ""

    const terms = [techQuery, seniorityQuery, contractQuery, regionQuery].filter(Boolean)
    return terms.join(" AND ")
  }
  const handleSearch = () => {
    const query = buildQuery()
    const encoded = encodeURIComponent(query)

    const url =
      tab === "jobs"
        ? `https://www.linkedin.com/jobs/search/?keywords=${encoded}&origin=JOBS_HOME_SEARCH_BUTTON`
        : `https://www.linkedin.com/search/results/content/?keywords=${encoded}&sortBy=DATE_POSTED`

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
        placeholder="React, QA, Frontend..."
        value={tech}
        onChange={setTech}
      />

      <Select label="Senioridade:" value={seniority} onChange={setSeniority}>
        <option value="Estágio">Estágio</option>
        <option value="Junior">Junior</option>
        <option value="Pleno">Pleno</option>
        <option value="Senior">Senior</option>
      </Select>

      <Input
        label="Tipo de vaga:"
        placeholder="CLT, PJ, Estágio, Freela..."
        value={tipoContrato}
        onChange={setTipoContrato}
      />

      <Input
        label="Região/Cidade:"
        placeholder="Remoto, São Paulo, Europa..."
        value={regiao}
        onChange={setRegiao}
      />

      <button onClick={handleSearch} className="button">
        Buscar no LinkedIn
      </button>
    </>
  )
}
