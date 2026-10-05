# Eval / Code Injection — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Backend `/api/eval` runs whatever JavaScript string the user submits using `eval()`.
- CWE Mapping: CWE-95 (Improper Neutralization of Directives in Dynamically Evaluated Code).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/EvalInjection/1_code_example
npm ci
npm start
```

Then open http://localhost:3008.

## How to demonstrate

- Enter `2 + 2` and click “Run server-side” to see a harmless result.
- Try `process.cwd()` or `require('fs').readdirSync('.')` to leak environment info.
- Execute `require('child_process').execSync('dir').toString()` (or `ls`) to show how eval can escalate to command execution.

## Where the vulnerability lives

- `server.js` line 14 — `/api/eval` calls `eval(code)` with no validation or sandboxing.
- `index.html` gives users a text area to submit arbitrary code (the text area on line 28, the request to `/api/eval` on lines 61–65).

## Fix talking points

- Avoid eval entirely; evaluate only trusted code paths.
- If dynamic logic is required, use template engines, interpreters, or sandboxes with strict allowlists.
- Strip dangerous tokens or parse/validate expressions to restrict allowed operations.
