Open Redirect — Intentionally Vulnerable Demo

What this shows
- `/go?target=` redirects to any user-supplied URL (open redirect).
- CWE Mapping: CWE-601 (URL Redirection to Untrusted Site).

How to run
1) `cd InsecureRedirects/1_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3015`

How to demonstrate
- Enter `https://example.com` to show a normal redirect.
- Enter `https://malicious.test/phish` to illustrate how attackers could bounce users to phishing pages.
- Use `//attacker.test` to show protocol-relative redirects if desired.

Fix talking points
- Enforce an allowlist of domains/paths before redirecting.
- Use server-side mapping of IDs to known destinations rather than trusting user input.
- Validate protocol (only https), strip protocol-relative URLs, and avoid reflecting arbitrary destinations.

