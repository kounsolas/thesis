const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data.db');

// Create DB and seed a few rows if empty
const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
  );
  db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
    if (err) return console.error('DB count error:', err);
    if ((row && row.count) === 0) {
      const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
      [
        ['Alice Johnson', 'alice@example.com'],
        ['Bob Smith', 'bob@example.com'],
        ['Charlie Adams', 'charlie@demo.io'],
        ['Dana Jones', 'dana@sample.org'],
        ['Eve McCoy', 'eve@redteam.net']
      ].forEach(([name, email]) => stmt.run(name, email));
      stmt.finalize();
    }
  });
});

// Serve the static demo page from this folder
app.use(express.static(__dirname));

// Intentionally vulnerable SQL query (DO NOT USE IN REAL CODE)
// Demonstration endpoint: string-concatenated input in SQL WHERE clause
app.get('/search', (req, res) => {
  const q = (req.query.q || '').toString();
  // Vulnerable: unsafely concatenating untrusted input into SQL
  const sql ="SELECT id, name, email FROM users WHERE name LIKE '%"+q+"%' OR email LIKE '%"+q+"%'";
  db.all(sql, (err, rows) => {
  //db.all("SELECT id, name, email FROM users WHERE name LIKE '%' || ? || '%' OR email LIKE '%' || ? || '%'", [q, q], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: String(err) });
    }
    res.json({ sql, results: rows });
  });
});

app.listen(PORT, () => {
  console.log(`SQLi demo running on http://localhost:${PORT}`);
});

