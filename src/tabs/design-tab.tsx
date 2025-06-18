import React, { useState } from "react";
import { Select } from "../components/select";
import { Input } from "../components/input";

const SENIORITY_MAP: Record<string, string[]> = {
  Junior: ["Junior", "JR", "Entry"],
  Pleno: ["Pleno", "Mid", "PL"],
  Senior: ["Senior", "SR"],
};

const CONTENT_KEYWORDS_DESIGN = {
  latam: ["vaga", "contratando", "oportunidade", "design", "designer", "UI", "UX"],
  internacional: ["hiring", "job", "opportunity", "design", "designer", "UI", "UX"],
  all: [
    "vaga",
    "contratando",
    "oportunidade",
    "hiring",
    "job",
    "opportunity",
    "design",
    "designer",
    "UI",
    "UX",
  ],
};

const CONTENT_KEYWORDS_QA = {
  latam: ["vaga", "contratando", "oportunidade", "QA", "Quality Assurance"],
  internacional: ["hiring", "job", "opportunity", "QA", "Quality Assurance"],
  all: ["vaga", "contratando", "oportunidade", "hiring", "job", "opportunity", "QA", "Quality Assurance"],
};

const JOB_TYPES = [
  { label: "Todas", value: "" },
  { label: "Tempo Integral", value: "Full-time" },
  { label: "Meio Período", value: "Part-time" },
  { label: "Temporário", value: "Temporary" },
  { label: "Contrato", value: "Contract" },
  { label: "Estágio", value: "Internship" },
];

function buildQuery(
  tech: string,
  seniority: string,
  tab: string,
  tipoVaga: string,
  contentKeywords: typeof CONTENT_KEYWORDS_DESIGN | typeof CONTENT_KEYWORDS_QA,
  jobType: string,
  region: string
) {
  const techFormatted = tech.trim();
  const seniorities = SENIORITY_MAP[seniority] || [seniority];
  const seniorityQuery = `(${seniorities.map(s => `"${s}"`).join(" OR ")})`;

  // filtro jobType na query, se informado
  const jobTypeQuery = jobType ? `"${jobType}"` : "";
  // filtro região / cidade na query, se informado
  const regionQuery = region ? `"${region.trim()}"` : "";

  if (tab === "jobs") {
    // montar array de partes da query, ignorando vazios
    const parts = [`"${techFormatted}"`, seniorityQuery];
    if (jobTypeQuery) parts.push(jobTypeQuery);
    if (regionQuery) parts.push(regionQuery);
    return parts.join(" AND ");
  }

  // para publicações
  const baseWords = contentKeywords[tipoVaga as keyof typeof contentKeywords];
  const pubQuery = `(${baseWords.map(w => `"${w}"`).join(" OR ")})`;
  const parts = [pubQuery, `"${techFormatted}"`, `"${seniorities[0]}"`];
  if (jobTypeQuery) parts.push(jobTypeQuery);
  if (regionQuery) parts.push(regionQuery);

  return parts.join(" AND ");
}

export function DesignTab() {
  const [tab, setTab] = useState("jobs");
  const [tech, setTech] = useState("Design");
  const [seniority, setSeniority] = useState("Junior");
  const [tipoVaga, setTipoVaga] = useState("all");
  const [jobType, setJobType] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = () => {
    const query = buildQuery(tech, seniority, tab, tipoVaga, CONTENT_KEYWORDS_DESIGN, jobType, region);
    const encoded = encodeURIComponent(query);
    const url =
      tab === "jobs"
        ? `https://www.linkedin.com/jobs/search/?keywords=${encoded}&origin=JOBS_HOME_SEARCH_BUTTON&refresh=true`
        : `https://www.linkedin.com/search/results/content/?keywords=${encoded}`;
    chrome.tabs.create({ url });
  };

  return (
    <>
      <Select label="Aba:" value={tab} onChange={setTab}>
        <option value="jobs">Vagas</option>
        <option value="content">Publicações</option>
      </Select>

      <Input label="Tecnologia:" placeholder="Design, UI, UX..." value={tech} onChange={setTech} />

      <Select label="Senioridade:" value={seniority} onChange={setSeniority}>
        <option value="Junior">Junior</option>
        <option value="Pleno">Pleno</option>
        <option value="Senior">Senior</option>
      </Select>

      {tab === "content" && (
        <Select label="Localidade:" value={tipoVaga} onChange={setTipoVaga}>
          <option value="all">Todas</option>
          <option value="latam">LATAM</option>
          <option value="internacional">Internacional</option>
        </Select>
      )}

      <Select label="Tipo de vaga:" value={jobType} onChange={setJobType}>
        {JOB_TYPES.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </Select>

      <Input
        label="Região / Cidade:"
        placeholder="São Paulo, Remote, New York..."
        value={region}
        onChange={setRegion}
      />

      <button onClick={handleSearch} className="button">
        Buscar no LinkedIn
      </button>
    </>
  );
}
