Eval / Code Injection — Intentionally Vulnerable Demo

What this shows
- Backend `/api/eval` runs whatever JavaScript string the user submits using `eval()`.
- CWE Mapping: CWE-95 (Improper Neutralization of Directives in Dynamically Evaluated Code).

How to run
1. `cd EvalInjection/1_code_example`
2. `npm install`
3. `npm start`
4. Browse to `http://localhost:3008`

Demo steps
- Enter `2 + 2` and click “Run server-side” to see a harmless result.
- Try `process.cwd()` or `require('fs').readdirSync('.')` to leak environment info.
- Execute `require('child_process').execSync('dir').toString()` (or `ls`) to show how eval can escalate to command execution.

Where the vulnerability lives
- `server.js` — `/api/eval` calls `eval(code)` with no validation or sandboxing.
- `index.html` gives users a text area to submit arbitrary code.

Fix talking points
- Avoid eval entirely; evaluate only trusted code paths.
- If dynamic logic is required, use template engines, interpreters, or sandboxes with strict allowlists.
- Strip dangerous tokens or parse/validate expressions to restrict allowed operations.

