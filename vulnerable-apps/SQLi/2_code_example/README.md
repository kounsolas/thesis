SQL Injection (Login Form) — Demo 2

What this shows
- Vulnerability: string-concatenated SQL in a login form.
- CWE Mapping: CWE-89 (SQL injection).
- Endpoint: `POST /login` in `server.js`.

How to run
1. `cd SQLi/2_code_example`
2. `npm install`
3. `npm start`
4. Browse to `http://localhost:3011`

Accounts (for baseline testing)
- alice / AL!cePass
- bob / B0bSecret
- charlie / Ch@rlie

How to demo the vulnerability
1. Load the page and try a valid account to show normal login behavior.
2. Enter any username and use an injection payload such as `' OR '1'='1` for the password field.
3. Watch the response in the JSON box—including the raw SQL query—showing that authentication can be bypassed.
4. Discuss how attackers could chain UNION SELECT payloads or exfiltrate other rows from the `users` table.

Fix talking points
- Replace dynamic SQL with parameterized queries (prepared statements).
- Limit error leakage; never echo raw SQL in responses.
- Enforce lockout and monitoring to detect brute-force or injection attempts.

