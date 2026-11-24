import React, { useState } from 'react'

const AddArticle = (props) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("general")

  const handleAdd = async () => {
    if (title === "") return

    await fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, description, category }),
    })

    setTitle("")
    setAuthor("")
    setDescription("")
    props.onAdded()
  }

  return (
    <div className="container mb-4">
      <h4>Add an article</h4>
      <input className="form-control mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="form-control mb-2" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input className="form-control mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <select className="form-control mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">general</option>
        <option value="sports">sports</option>
        <option value="business">business</option>
        <option value="technology">technology</option>
        <option value="entertainment">entertainment</option>
      </select>
      <button className="btn btn-primary" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default AddArticle