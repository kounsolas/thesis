Purpose
- This repo demonstrates a simple, intentionally vulnerable web page you can use to teach detection and remediation.

What It Shows
- Vulnerability type: DOM-based XSS (unsanitized input injected into the page as HTML).

Quick Demo (View the Vulnerability)
- Open `index.html` in a browser.
- Type `<b>This should be bold</b>` in the search box and click Search.
- The page renders bold text in the “Results for:” area. That happens because user input is inserted with `innerHTML` instead of being treated as plain text — a DOM XSS risk.

Basic Search Functionality
- Type a term like `mouse` and click Search. The list filters to matching items.

Files to Know
- Runtime script loaded by the page: `main.js` (no build needed to run the demo).
- File to scan with your security tool: `main.dom-xss.ts` (contains the vulnerable code you want students to detect).

Where the Vulnerability Lives
- Display target: `index.html:91` (`<div id="results">`). The element itself is fine.
- Injection point: `main.js:28` (uses `innerHTML` with untrusted input).
- TypeScript source: `main.dom-xss.ts:40`.

Scan Instructions (Bearer or similar)
- If your tool scans a file directly, point it at: `main.dom-xss.ts`.
- If your tool scans a project, run it from the repo root so it picks up all files.
- Example (adjust to your setup): `bearer scan .` or target the specific file if supported.

Optional TypeScript Workflow
- Install deps: `npm install`
- Build once or watch: `npm run build` or `npm run watch`
- Note: the page loads `main.js`. You don’t need to build for the demo, but `main.dom-xss.ts` is kept for static analysis and teaching.

How to Fix (for your lesson follow-up)
- Replace `innerHTML` with `textContent` for untrusted input.
- If HTML is required, sanitize using a vetted library and an allowlist of elements/attributes.
- Consider a strict Content Security Policy (CSP) to reduce impact.
