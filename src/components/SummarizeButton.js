import React, { useState } from 'react'

const SummarizeButton = (props) => {
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: props.text }),
      })
      const data = await res.json()
      setSummary(data.summary || "Could not summarize")
    } catch (error) {
      setSummary("Could not summarize")
    }
    setLoading(false)
  }

    return (
    <>
      <button className={`btn btn-sm mt-2 ${props.darkMode ? "btn-outline-light" : "btn-outline-dark"}`} onClick={handleSummarize}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      {summary && <p className="mt-2">{summary}</p>}
    </>
  )
}

export default SummarizeButton