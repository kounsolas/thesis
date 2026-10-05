# Server-Side Request Forgery (SSRF) — Demo 3

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- `/api/fetch` accepts any URL and fetches it server-side, allowing SSRF to internal resources.
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/SSRF/3_code_example
npm ci
npm start
```

Then open http://localhost:3017.

## How to demonstrate

- Normal: fetch `https://example.com` to show a benign response (needs an Internet connection).
- SSRF: fetch `http://localhost:3017/internal/report` to access an internal-only endpoint. `http://127.0.0.1:3017/internal/report` works as well.
- Discuss cloud metadata risk: `http://169.254.169.254/latest/meta-data/`.

## Where the vulnerability lives

- `server.js` line 29: `/api/fetch` passes user input directly into `fetch` with no validation.

## Fix talking points

- Use allowlists for outbound targets and block private/metadata IP ranges.
- Avoid user-supplied URLs; map IDs to approved destinations.
- Add egress controls and monitoring for unusual outbound requests.
