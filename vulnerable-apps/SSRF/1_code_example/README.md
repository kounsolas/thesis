# Server-Side Request Forgery (SSRF) — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Backend `/api/proxy` fetches any URL provided by the user, allowing requests to internal services.
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SSRF/1_code_example
npm ci
npm start
```

Then open http://localhost:3009.

## How to demonstrate

- Enter `https://example.com` to show a benign fetch (needs an Internet connection).
- Enter `http://localhost:3009/internal/secret` — reveals data that should only be reachable internally. `http://127.0.0.1:3009/internal/secret` works as well.
- Discuss how the same flaw could hit cloud metadata endpoints (`http://169.254.169.254/latest/meta-data/`).

## Where the vulnerability lives

- `server.js` line 27 — `/api/proxy` blindly passes user input into `fetch`, no validation or network filtering.
- `index.html` UI encourages users to supply arbitrary URLs (the form on lines 27–30, the Try These list on lines 35–42).

## Fix talking points

- Enforce allowlists/regex for allowed hosts, block internal IP ranges.
- Disable direct access to metadata IPs at the network layer.
- Use SSRF-aware libraries or service-specific proxies, and log/monitor unusual outbound requests.
