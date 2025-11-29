Server-Side Request Forgery (SSRF) — Intentionally Vulnerable Demo

What this shows
- Backend `/api/proxy` fetches any URL provided by the user, allowing requests to internal services.
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

How to run
1. `cd SSRF/1_code_example`
2. `npm install`
3. `npm start`
4. Visit `http://localhost:3009`

Demo steps
- Enter `https://example.com` to show a benign fetch.
- Enter `http://localhost:3009/internal/secret` — reveals data that should only be reachable internally.
- Discuss how the same flaw could hit cloud metadata endpoints (`http://169.254.169.254/latest/meta-data/`).

Where the vulnerability lives
- `server.js` — `/api/proxy` blindly passes user input into `fetch`, no validation or network filtering.
- `index.html` UI encourages users to supply arbitrary URLs.

Fix talking points
- Enforce allowlists/regex for allowed hosts, block internal IP ranges.
- Disable direct access to metadata IPs at the network layer.
- Use SSRF-aware libraries or service-specific proxies, and log/monitor unusual outbound requests.

