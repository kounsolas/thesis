const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3012;
const DB_PATH = path.join(__dirname, 'jobs.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, company TEXT, location TEXT, description TEXT)'
  );
  db.get('SELECT COUNT(*) AS count FROM jobs', (err, row) => {
    if (err) return console.error('DB error:', err);
    if ((row && row.count) === 0) {
      const stmt = db.prepare('INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)');
      [
        ['Frontend Engineer', 'Lumina Labs', 'Remote', 'Build UI components for our analytics suite.'],
        ['Backend Developer', 'Northwind Health', 'Austin, TX', 'APIs for patient scheduling and records.'],
        ['Security Analyst', 'Atlas Bank', 'New York, NY', 'Monitor SIEM alerts and triage incidents.'],
        ['Data Scientist', 'Orion Retail', 'Remote', 'Demand forecasting and personalization models.'],
        ['DevOps Engineer', 'Cobalt Energy', 'Denver, CO', 'CI/CD, cloud infra, and observability.']
      ].forEach((row) => stmt.run(...row));
      stmt.finalize();
    }
  });
});

// Intentionally vulnerable SQL: concatenates user input directly into the query
app.get('/search', (req, res) => {
  const q = (req.query.q || '').toString();
  const sql = 
    "SELECT id, title, company, location, description FROM jobs WHERE title LIKE '%" +
    q +
    "%' OR company LIKE '%" +
    q +
    "%' OR location LIKE '%" +
    q +
    "%' OR description LIKE '%" +
    q +
    "%'";

  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: String(err) });
    }
    res.json({ sql, results: rows });
  });
});

app.listen(PORT, () => {
  console.log(`SQLi demo #3 running at http://localhost:${PORT}`);
});

