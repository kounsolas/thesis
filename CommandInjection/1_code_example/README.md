Command Injection — Intentionally Vulnerable Demo

What this shows
- Backend `/api/run` executes whatever command a user submits (`exec(cmd)`), enabling command injection.
- CWE Mapping: CWE-78 (Improper Neutralization of Special Elements in an OS Command).

How to run
1. `cd CommandInjection/1_code_example`
2. `npm install`
3. `npm start`
4. Browse to `http://localhost:3007`

Demo steps
- Submit `echo hello` to see a benign response.
- Try `dir` (Win) or `ls` (Unix) to list server files—proves remote command execution.
- Chain additional commands (`dir & type secrets\admin-passwords.txt`) to show data theft.

Where the vulnerability lives
- `server.js` — `/api/run` passes user input directly into `child_process.exec` without validation.
- `index.html` provides an interface to send arbitrary strings to that endpoint.

Fix ideas for your teaching session
- Avoid shell execution; use safe library functions for needed operations.
- Implement strict allowlists/parameter parsing if shell commands are unavoidable.
- Escape/sanitize inputs and run processes under low-privilege accounts.

