# Path Traversal — Demo 2

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Vulnerable endpoint: `GET /download?file=...` concatenates user input into a filesystem path, allowing directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/PathTraversal/2_code_example
npm ci
npm start
```

Then open http://localhost:3012.

## How to demonstrate

Type the value after `file=` into the input on the page and click “Fetch”, or request `/download?file=<value>` directly.

- Normal case: `file=readme.txt` (from `files/`).
- Path traversal: `file=../secrets/finance-report.txt` — escapes `files/` and reads a sensitive file.
- Discuss how any file readable by the process can be exposed.

## Where the vulnerability lives

- `server.js` line 19 — `/download` uses `path.join(FILE_ROOT, fileParam)` without validation, so `..` escapes `FILE_ROOT` (`files/`); the file is read on line 21.

## Fix talking points

- Normalize and validate requested paths; reject any containing `..`, absolute paths, or separators.
- Use an allowlist or map IDs to filenames instead of letting users specify paths directly.
- Keep sensitive data outside publicly served directories and run with least privileges.
