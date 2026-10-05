# Path Traversal — Demo 3

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- `/view?doc=` reads files based on user input with no validation, allowing directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/PathTraversal/3_code_example
npm ci
npm start
```

Then open http://localhost:3019.

## How to demonstrate

Type the value after `doc=` into the input on the page and click “View”, or request `/view?doc=<value>` directly.

- Normal: `doc=getting-started.txt` shows a public document.
- Path traversal: `doc=../private/credentials.txt` reads a sensitive file outside the docs folder.

## Where the vulnerability lives

- `server.js` line 17: `path.join(DOCS_DIR, doc)` is used without validation; the file is read on line 18.

## Fix talking points

- Normalize and validate requested paths; reject `..`, absolute paths, and separators.
- Map known document IDs to filenames server-side instead of accepting raw filenames.
- Keep sensitive files outside any directory reachable by user-controlled paths.
