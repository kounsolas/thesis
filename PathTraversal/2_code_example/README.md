Path Traversal — Demo 2

What this shows
- Vulnerable endpoint: `GET /download?file=...` concatenates user input into a filesystem path, allowing directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

How to run
1) `cd PathTraversal/2_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3012`

How to demonstrate the vulnerability
- Normal case: `file=readme.txt` (from `files/`).
- Path traversal: `file=../secrets/finance-report.txt` — escapes `files/` and reads a sensitive file.
- Discuss how any file readable by the process can be exposed.

Fix ideas for teaching
- Normalize and validate requested paths; reject any containing `..`, absolute paths, or separators.
- Use an allowlist or map IDs to filenames instead of letting users specify paths directly.
- Keep sensitive data outside publicly served directories and run with least privileges.

