const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "newsapp",
});

// app.get("/articles", (req, res) => {
//   db.query("SELECT * FROM articles", (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

app.get("/articles", (req, res) => {
  const search = req.query.q;
  const category = req.query.category;

  if (search) {
    db.query(
      "SELECT * FROM articles WHERE title LIKE ?",
      ["%" + search + "%"],
      (err, results) => res.json(results)
    );
  } else if (category) {
    db.query(
      "SELECT * FROM articles WHERE category = ?",
      [category],
      (err, results) => res.json(results)
    );
  } else {
    db.query("SELECT * FROM articles", (err, results) => res.json(results));
  }
});

app.post("/articles", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const category = req.body.category;

  db.query(
    "INSERT INTO articles (title, author, description, category, publishedAt) VALUES (?, ?, ?, ?, NOW())",
    [title, author, description, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Article added" });
    }
  );
});

app.post("/summarize", async (req, res) => {
  const text = req.body.text;

  try {
    const response = await fetch(
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: "Summarize this news article in 2 simple sentences: " + text }] },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.error) {
      return res.json({ summary: "Gemini error: " + data.error.message });
    }

    const summary = data.candidates[0].content.parts[0].text;
    res.json({ summary: summary });
  } catch (err) {
    console.log(err.message);
    res.json({ summary: "Server error: " + err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));