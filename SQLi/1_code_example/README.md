SQL Injection (SQLi) — Intentionally Vulnerable Demo

What this shows
- Vulnerability: SQL injection via concatenating untrusted input into a SQL string.
- File with the vulnerability: `server.js` (`/search` endpoint builds SQL with `+ q +`).

CWE Mapping
- CWE-89: Improper Neutralization of Special Elements used in an SQL Command (SQL Injection).

Run locally (PowerShell or terminal)
1) Change into this folder:
   - `cd SQLi/1_code_example`
2) Install dependencies:
   - `npm install`
3) Start the server:
   - `npm start`
4) Open the page:
   - Visit `http://localhost:3001` in your browser.

Try these inputs in the search box
- `a` — normal search.
- `' OR '1'='1` — makes the WHERE clause always true.
- `%' UNION SELECT 999,'attacker','pwned@example.com' --` — demonstrates UNION‑style injection.

How it’s vulnerable (server.js)
- The code constructs SQL like:
  `SELECT ... WHERE name LIKE '%` + q + `%' OR email LIKE '%` + q + `%'`
- Because `q` is untrusted input, an attacker can break out of the string and inject SQL.

How to fix (for teaching follow‑up)
- Use parameterized queries / prepared statements.
- Avoid building SQL with string concatenation.
- Validate and constrain inputs at the application layer.
