Path Traversal — Intentionally Vulnerable Demo

What this shows
- Endpoint `/download?file=...` concatenates untrusted file paths, enabling directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

How to run
1. `cd PathTraversal/1_code_example`
2. `npm install`
3. `npm start`
4. Open `http://localhost:3006`

Demo steps
- Enter `public-note.txt` and click “Fetch File” — expected behavior.
- Enter `../secrets/admin-passwords.txt` — you’ll read a sensitive file outside the allowed folder.
- Show how any file readable by the process becomes exposed.

Where the vulnerability lives
- `server.js` — `/download` uses `path.join(FILES_DIR, fileParam)` without validation, so `..` escapes `FILES_DIR`.
- `index.html` demonstrates the attack by letting users type arbitrary filenames.

Fix ideas for teaching
- Normalize paths and ensure they resolve within the intended directory before reading.
- Reject any filename containing `..`, `/`, `\`, or absolute prefixes.
- Map logical IDs to actual files instead of exposing filesystem structure.

