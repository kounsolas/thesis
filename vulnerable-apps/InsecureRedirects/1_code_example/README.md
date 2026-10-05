# Open Redirect — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- `/go?target=` redirects to any user-supplied URL (open redirect).
- CWE Mapping: CWE-601 (URL Redirection to Untrusted Site).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/InsecureRedirects/1_code_example
npm ci
npm start
```

Then open http://localhost:3015.

## How to demonstrate

- Enter `https://example.com` to show a normal redirect.
- Enter `https://malicious.test/phish` to illustrate how attackers could bounce users to phishing pages.
- Use `//attacker.test` to show protocol-relative redirects if desired.

## Where the vulnerability lives

- `server.js` line 14 — `res.redirect(target)` redirects to whatever URL the user supplies in the `target` query parameter (read on line 10); the only check is that it is not empty (lines 11–13).

## Fix talking points

- Enforce an allowlist of domains/paths before redirecting.
- Use server-side mapping of IDs to known destinations rather than trusting user input.
- Validate protocol (only https), strip protocol-relative URLs, and avoid reflecting arbitrary destinations.

## Patched variant

`server.patched.js` is the same app, but `/go` redirects only to the allow-listed targets `/planes`, `/trains` and `/automobiles` (the check is on lines 14–17) and answers `406 Not Acceptable` for any other target; a missing `target` gets `400`, as in `server.js`. Stop the vulnerable server first, because both use port 3015. Then, in the same folder, run:

```bash
node server.patched.js
```

The inputs from “How to demonstrate” are not on the list, so they get `406 Not Acceptable`. The three allow-listed paths have no routes of their own, so an allowed redirect (for example `/planes`) ends on a 404 page.
