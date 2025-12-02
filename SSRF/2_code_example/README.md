Server-Side Request Forgery (SSRF) — Demo 2

What this shows
- `/api/proxy` fetches any URL the user supplies, enabling SSRF to internal services.
- Internal-only route: `/internal/config` (simulates metadata/secret endpoint).
- CWE Mapping: CWE-918 (Server-Side Request Forgery).

How to run
1) `cd SSRF/2_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3010`

How to demonstrate
- Normal: fetch `https://example.com` or another public URL to show basic behavior.
- SSRF: fetch `http://localhost:3010/internal/config` to show access to an internal-only endpoint.
- Discuss how similar flaws can hit cloud metadata services (e.g., `http://169.254.169.254/latest/meta-data/`).

Fix ideas to cover
- Use allowlists for outbound targets; block private/metadata IPs.
- Require service-specific proxies rather than arbitrary URLs.
- Add network egress controls and logging for unusual outbound requests.

