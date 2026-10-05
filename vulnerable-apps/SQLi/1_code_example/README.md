# SQL Injection (SQLi) — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Vulnerability: SQL injection via concatenating untrusted input into a SQL string.
- File with the vulnerability: `server.js` (`/search` endpoint builds SQL with `+ q +`).
- CWE Mapping: CWE-89: Improper Neutralization of Special Elements used in an SQL Command (SQL Injection).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SQLi/1_code_example
npm ci
npm start
```

Then open http://localhost:3001.

The SQLite database `data.db` is created and seeded on first start.

## How to demonstrate

Try these inputs in the search box:

- `a` — normal search.
- `' OR '1'='1` — makes the WHERE clause always true.
- `%' UNION SELECT 999,'attacker','pwned@example.com' --` — demonstrates UNION‑style injection.

## Where the vulnerability lives

- `server.js` line 37 constructs SQL like: `SELECT ... WHERE name LIKE '%` + q + `%' OR email LIKE '%` + q + `%'`
- `server.js` line 38 executes the concatenated string with `db.all(sql, …)`.
- Because `q` is untrusted input, an attacker can break out of the string and inject SQL.

## Fix talking points

- Use parameterized queries / prepared statements.
- Avoid building SQL with string concatenation.
- Validate and constrain inputs at the application layer.
