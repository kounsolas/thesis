# Command Injection — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Backend `/api/run` executes whatever command a user submits (`exec(cmd)`), enabling command injection.
- CWE Mapping: CWE-78 (Improper Neutralization of Special Elements in an OS Command).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/CommandInjection/1_code_example
npm ci
npm start
```

Then open http://localhost:3007.

## How to demonstrate

- Submit `echo hello` to see a benign response.
- Try `dir` (Win) or `ls` (Unix) to list server files—proves remote command execution.
- Chain additional commands (`dir & type secrets\admin-passwords.txt`) to show data theft.

## Where the vulnerability lives

- `server.js` line 18 — `/api/run` passes user input directly into `child_process.exec` without validation.
- `index.html` provides an interface to send arbitrary strings to that endpoint (the form on lines 27–30, the request to `/api/run` on lines 62–66).

## Fix talking points

- Avoid shell execution; use safe library functions for needed operations.
- Implement strict allowlists/parameter parsing if shell commands are unavoidable.
- Escape/sanitize inputs and run processes under low-privilege accounts.
