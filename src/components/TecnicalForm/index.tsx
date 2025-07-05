import React from "react"
import { useForm, Controller } from "react-hook-form"
import { DeveloperFormValues } from "../../shared/types/developer"
import { onSubmit } from "../../shared/utils/query"
import { Select } from "../select"
import { Input } from "../input"

export function TecnicalForm() {
  const { handleSubmit, control, watch } = useForm<DeveloperFormValues>({
    defaultValues: {
      tab: "jobs",
      skip: 0,
      seniority:"Estágio",
    },
  })

  const values = watch()

  const isFormFilled =
    values.tab &&
    values.tech?.trim() &&
    values.seniority &&
    values.skip !== undefined

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
        name="skip"
        control={control}
        render={({ field }) => (
          <Input
            label="Skip"
            placeholder="Página de Pesquisa"
            type="number"
            {...field}
          />
        )}
      />

      <button type="submit" className="button" disabled={!isFormFilled}>
        Buscar no LinkedIn
      </button>
    </form>
  )
}
