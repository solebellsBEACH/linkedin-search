import React from "react"
import { useForm, Controller } from "react-hook-form"
import { Select } from "../components/select"
import { Input } from "../components/input"
import { redirectUrl } from "../shared/utils/chrome"

const SENIORITY_MAP: Record<string, string[]> = {
  Junior: ["Junior", "JR", "Entry"],
  Pleno: ["Pleno", "Mid", "PL"],
  Senior: ["Senior", "SR"],
  Estágio: ["Estagiário", "Estágio", "Intern"],
}

type FormValues = {
  tab: string
  tech: string
  seniority: string
  tipoContrato: string
  regiao: string
}

export function DevelopersTab() {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      tab: "jobs",
      tech: "React",
      seniority: "Junior",
      tipoContrato: "",
      regiao: "",
    },
  })

  const buildQuery = (data: FormValues) => {
    const techFormatted = data.tech.trim()
    const regionFormatted = data.regiao.trim()
    const contractFormatted = data.tipoContrato.trim()
    const seniorities = SENIORITY_MAP[data.seniority] || [data.seniority]

    const techQuery = techFormatted.toLowerCase().includes("front")
      ? `("Frontend" OR "Front")`
      : `("${techFormatted}")`

    const seniorityQuery = `(${seniorities.map(s => `"${s}"`).join(" OR ")})`
    const contractQuery = contractFormatted ? `("${contractFormatted}")` : ""
    const regionQuery = regionFormatted ? `("${regionFormatted}")` : ""

    const terms = [techQuery, seniorityQuery, contractQuery, regionQuery].filter(Boolean)
    return terms.join(" AND ")
  }

  const onSubmit = (data: FormValues) => {
    const query = buildQuery(data)
    const encoded = encodeURIComponent(query)

    const url =
      data.tab === "jobs"
        ? `https://www.linkedin.com/jobs/search/?keywords=${encoded}&origin=JOBS_HOME_SEARCH_BUTTON`
        : `https://www.linkedin.com/search/results/content/?keywords=${encoded}&sortBy=DATE_POSTED`
    console.log(url, data)
    redirectUrl( url )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="tab"
        control={control}
        render={({ field }) => (
          <Select label="Aba:" {...field}>
            <option value="jobs">Vagas</option>
            <option value="content">Publicações</option>
          </Select>
        )}
      />

      <Controller
        name="tech"
        control={control}
        render={({ field }) => (
          <Input
            label="Tecnologia:"
            placeholder="React, QA, Frontend..."
            {...field}
          />
        )}
      />

      <Controller
        name="seniority"
        control={control}
        render={({ field }) => (
          <Select label="Senioridade:" {...field}>
            <option value="Estágio">Estágio</option>
            <option value="Junior">Junior</option>
            <option value="Pleno">Pleno</option>
            <option value="Senior">Senior</option>
          </Select>
        )}
      />

      <Controller
        name="tipoContrato"
        control={control}
        render={({ field }) => (
          <Input
            label="Tipo de vaga:"
            placeholder="CLT, PJ, Estágio, Freela..."
            {...field}
          />
        )}
      />

      <Controller
        name="regiao"
        control={control}
        render={({ field }) => (
          <Input
            label="Região/Cidade:"
            placeholder="Remoto, São Paulo, Europa..."
            {...field}
          />
        )}
      />

      <button type="submit" className="button">
        Buscar no LinkedIn
      </button>
    </form>
  )
}
