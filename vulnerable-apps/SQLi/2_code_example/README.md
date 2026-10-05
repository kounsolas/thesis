# SQL Injection (Login Form) — Demo 2

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Vulnerability: string-concatenated SQL in a login form.
- CWE Mapping: CWE-89 (SQL injection).
- Endpoint: `POST /login` in `server.js`.

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SQLi/2_code_example
npm ci
npm start
```

Then open http://localhost:3011.

The SQLite database `auth.db` is created and seeded on first start.

## Accounts

For baseline testing:

- alice / AL!cePass
- bob / B0bSecret
- charlie / Ch@rlie

## How to demonstrate

1. Load the page and try a valid account to show normal login behavior.
2. Enter any username and use an injection payload such as `' OR '1'='1` for the password field.
3. Watch the response in the JSON box—including the raw SQL query—showing that authentication can be bypassed.
4. Discuss how attackers could chain UNION SELECT payloads or exfiltrate other rows from the `users` table.

## Where the vulnerability lives

- `server.js` lines 36–41: the `/login` endpoint concatenates `username` and `password` directly into the SQL `WHERE` clause; the query is executed on line 44.

## Fix talking points

- Replace dynamic SQL with parameterized queries (prepared statements).
- Limit error leakage; never echo raw SQL in responses.
- Enforce lockout and monitoring to detect brute-force or injection attempts.
