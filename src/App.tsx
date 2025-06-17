import React, { useState } from "react"

export default function Popup() {
  const [tab, setTab] = useState("jobs")
  const [tech, setTech] = useState("")
  const [seniority, setSeniority] = useState("")

  const handleSearch = () => {
    const keywords = [tech, seniority].filter(Boolean).join(" ")
    const url =
      tab === "jobs"
        ? `https://www.linkedin.com/search/results/jobs/?keywords=${encodeURIComponent(keywords)}`
        : `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(keywords)}`
    chrome.tabs.create({ url })
  }

  return (
    <div style={{ width: 280, padding: 16, fontFamily: "Arial, sans-serif" }}>
      <label>
        Escolha a aba:
        <select
          value={tab}
          onChange={e => setTab(e.target.value)}
          style={{ width: "100%", marginTop: 8, padding: 6 }}
        >
          <option value="jobs">Vagas</option>
          <option value="content">Publicações</option>
        </select>
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Tecnologia:
        <input
          type="text"
          placeholder="React, Angular..."
          value={tech}
          onChange={e => setTech(e.target.value)}
          style={{ width: "100%", marginTop: 6, padding: 6 }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Senioridade:
        <input
          type="text"
          placeholder="Senior, SR..."
          value={seniority}
          onChange={e => setSeniority(e.target.value)}
          style={{ width: "100%", marginTop: 6, padding: 6 }}
        />
      </label>

      <button
        onClick={handleSearch}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 10,
          backgroundColor: "#0072b1",
          color: "#fff",
          border: "none",
          cursor: "pointer"
        }}
      >
        Pesquisar no LinkedIn
      </button>
    </div>
  )
}
