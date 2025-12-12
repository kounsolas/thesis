SQL Injection (Job Finder) — Demo 3 - Have not generate a correct patch yet

What this shows
- Vulnerability: SQL injection via string-concatenated search query.
- CWE Mapping: CWE-89 (Improper Neutralization of Special Elements used in an SQL Command).

How to run
1) `cd SQLi/3_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3012`

How to demonstrate
- Normal search: type `engineer` or `remote` and submit.
- Injection: use `' OR '1'='1` or `%' UNION SELECT 999,'attacker','Nowhere','Pwned data','exfiltrated' --`
` to show you can break out of the query and return arbitrary rows.
- The executed SQL is displayed on the page so you can see how input is concatenated.

Where the vulnerability lives
- `server.js`: the `/search` endpoint concatenates `q` directly into the SQL `WHERE` clause.

Fix talking points
- Use parameterized queries / prepared statements.
- Avoid building SQL with string concatenation.
- Validate and constrain inputs at the application layer.

