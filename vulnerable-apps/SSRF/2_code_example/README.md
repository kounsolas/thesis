# Server-Side Request Forgery (SSRF) — Demo 2

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- `/api/proxy` fetches any URL the user supplies, enabling SSRF to internal services.
- Internal-only route: `/internal/config` (simulates metadata/secret endpoint).
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SSRF/2_code_example
npm ci
npm start
```

Then open http://localhost:3010.

## How to demonstrate

- Normal: fetch `https://example.com` or another public URL to show basic behavior (needs an Internet connection).
- SSRF: fetch `http://localhost:3010/internal/config` to show access to an internal-only endpoint. `http://127.0.0.1:3010/internal/config` works as well.
- Discuss how similar flaws can hit cloud metadata services (e.g., `http://169.254.169.254/latest/meta-data/`).

## Where the vulnerability lives

- `server.js` line 28 — `/api/proxy` passes the user-supplied URL straight into `fetch`, with no check other than that the URL is not empty.

## Fix talking points

- Use allowlists for outbound targets; block private/metadata IPs.
- Require service-specific proxies rather than arbitrary URLs.
- Add network egress controls and logging for unusual outbound requests.
