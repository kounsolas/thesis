# DOM XSS — Demo 1

> **Intentionally vulnerable.** Open this page only locally and never deploy it.

## What this shows

- This example demonstrates a simple, intentionally vulnerable web page you can use to teach detection and remediation.
- Vulnerability type: DOM-based XSS (unsanitized input injected into the page as HTML).
- CWE Mapping: CWE-79: Improper Neutralization of Input During Web Page Generation (Cross-site Scripting).

## How to run

The page is static: there is no server and nothing to install. From the repository root, open it from a terminal (PowerShell/cmd):

```bash
cd vulnerable-apps/XSS/1_code_example
start index.html
```

Or open `index.html` manually in a browser.

## How to demonstrate

- Type a term like `mouse` and click Search. The list filters to matching items.
- Type `<b>This should be bold</b>` in the search box and click Search.
- The page renders bold text in the “Results for:” area. That happens because user input is inserted with `innerHTML` instead of being treated as plain text — a DOM XSS risk.

## Where the vulnerability lives

- Display target: `index.html:91` (`<div id="results">`). The element itself is fine.
- Injection point: `main.js:27` (uses `innerHTML` with untrusted input); line 28 is a commented-out safe version.
- TypeScript source: `main.ts:38`.

## Files to know

- Runtime script loaded by the page: `main.js` (no build needed to run the demo).
- File to scan with your security tool: `main.ts` (contains the vulnerable code you want students to detect).

## Scan instructions

For Bearer or a similar security scanner:

- If your tool scans a file directly, point it at: `main.ts`.
- If your tool scans a project, run it from this folder so it picks up all files.
- Example (adjust to your setup): `bearer scan .` or target the specific file if supported.

## Optional TypeScript workflow

Requires Node.js 20 or newer. Run the commands below in this folder.

> **Warning.** `npm run build` regenerates the tracked `main.js` from `main.ts` and overwrites it (`npm run watch` does the same). The commented-out safe version on line 28 exists only in `main.js`, so it is lost.

- Install deps: `npm ci`
- Build once or watch: `npm run build` or `npm run watch`
- Run `start index.html`
- Note: the page loads `main.js`. You don’t need to build for the demo, but `main.ts` is kept for static analysis and teaching.

## Fix talking points

- Replace `innerHTML` with `textContent` for untrusted input.
- If HTML is required, sanitize using a vetted library and an allowlist of elements/attributes.
- Consider a strict Content Security Policy (CSP) to reduce impact.
