const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "newsapp",
});

const API_KEY = process.env.NEWS_API_KEY;

const CATEGORY = process.argv[2];
const QUERY = process.argv[3];

async function seed() {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${QUERY}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`
  );
  const data = await res.json();

  const rows = data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a) => [
      a.source.name,
      a.author,
      a.title,
      a.description,
      a.url,
      a.urlToImage,
      new Date(a.publishedAt),
      a.content,
      CATEGORY,
    ]);

  if (rows.length === 0) {
    console.log("No articles to insert");
    db.end();
    return;
  }

  db.query(
    "INSERT INTO articles (sourceName, author, title, description, url, urlToImage, publishedAt, content, category) VALUES ?",
    [rows],
    (err, result) => {
      if (err) console.log("Error:", err.message);
      else console.log("Inserted", result.affectedRows, "articles in", CATEGORY);
      db.end();
    }
  );
}

seed();