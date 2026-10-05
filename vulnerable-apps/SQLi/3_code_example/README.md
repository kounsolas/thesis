# SQL Injection (Job Finder) — Demo 3

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Vulnerability: SQL injection via string-concatenated search query.
- CWE Mapping: CWE-89 (Improper Neutralization of Special Elements used in an SQL Command).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SQLi/3_code_example
npm ci
npm start
```

Then open http://localhost:3018.

The SQLite database `jobs.db` is created and seeded on first start.

## How to demonstrate

- Normal search: type `engineer` or `remote` and submit.
- Injection: use `' OR '1'='1` or `%' UNION SELECT 999,'attacker','Nowhere','Pwned data','exfiltrated' --` to show you can break out of the query and return arbitrary rows.
- The executed SQL is displayed on the page so you can see how input is concatenated.

## Where the vulnerability lives

- `server.js` lines 36–45: the `/search` endpoint concatenates `q` directly into the SQL `WHERE` clause; the query is executed on line 47.

## Fix talking points

- Use parameterized queries / prepared statements.
- Avoid building SQL with string concatenation.
- Validate and constrain inputs at the application layer.

## Patched variant

`server.patched.js` is the same app with the `/search` query parameterized (`LIKE ?`); the query and its parameters are on lines 36–38. Stop the vulnerable server first, because both use port 3018. Then, in the same folder, run:

```bash
node server.patched.js
```

The UNION payload from “How to demonstrate” then returns no rows. Both servers serve the same `index.html`, so the label above the executed query reads “Executed Query (unsafe)” on both, even though the patched server shows the parameterized statement with `?` placeholders there.
