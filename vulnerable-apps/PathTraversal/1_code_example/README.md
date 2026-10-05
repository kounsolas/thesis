# Path Traversal — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Endpoint `/download?file=...` concatenates untrusted file paths, enabling directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/PathTraversal/1_code_example
npm ci
npm start
```

Then open http://localhost:3006.

## How to demonstrate

- Enter `public-note.txt` and click “Fetch File” — expected behavior.
- Enter `../secrets/admin-passwords.txt` — you’ll read a sensitive file outside the allowed folder.
- Show how any file readable by the process becomes exposed.

## Where the vulnerability lives

- `server.js` line 18 — `/download` uses `path.join(FILES_DIR, fileParam)` without validation, so `..` escapes `FILES_DIR`; the file is read on line 20.
- `index.html` demonstrates the attack by letting users type arbitrary filenames (the form on lines 27–30, the Try These Inputs list on lines 35–41).

## Fix talking points

- Normalize paths and ensure they resolve within the intended directory before reading.
- Reject any filename containing `..`, `/`, `\`, or absolute prefixes.
- Map logical IDs to actual files instead of exposing filesystem structure.
