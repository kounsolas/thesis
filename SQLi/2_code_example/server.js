const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3011;
const DB_PATH = path.join(__dirname, 'auth.db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database(DB_PATH);
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, full_name TEXT)'
  );
  db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
    if (err) return console.error('DB error:', err);
    if ((row && row.count) === 0) {
      const stmt = db.prepare('INSERT INTO users (username, password, full_name) VALUES (?, ?, ?)');
      [
        ['alice', 'AL!cePass', 'Alice Johnson'],
        ['bob', 'B0bSecret', 'Bob Smith'],
        ['charlie', 'Ch@rlie', 'Charlie Adams']
      ].forEach((values) => stmt.run(...values));
      stmt.finalize();
    }
  });
});

app.post('/login', (req, res) => {
  const username = (req.body.username || '').toString();
  const password = (req.body.password || '').toString();

  const sql =
    "SELECT id, username, full_name FROM users WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";

  db.get(sql, (err, row) => {
  // const sql = "SELECT id, username, full_name FROM users WHERE username = ? AND password = ?";
  // db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: String(err) });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials', sql });
    }
    res.json({ message: 'Welcome back', user: row, sql });
  });
});

app.listen(PORT, () => {
  console.log(`SQLi login demo running at http://localhost:${PORT}`);
});

