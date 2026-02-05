Server-Side Request Forgery (SSRF) — Demo 3

What this shows
- `/api/fetch` accepts any URL and fetches it server-side, allowing SSRF to internal resources.
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

How to run
1) `cd SSRF/3_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3017`

How to demonstrate
- Normal: fetch `https://example.com` to show a benign response.
- SSRF: fetch `http://localhost:3017/internal/report` to access an internal-only endpoint.
- Discuss cloud metadata risk: `http://169.254.169.254/latest/meta-data/`.

Where the vulnerability lives
- `server.js`: `/api/fetch` passes user input directly into `fetch` with no validation.

Fix talking points
- Use allowlists for outbound targets and block private/metadata IP ranges.
- Avoid user-supplied URLs; map IDs to approved destinations.
- Add egress controls and monitoring for unusual outbound requests.

