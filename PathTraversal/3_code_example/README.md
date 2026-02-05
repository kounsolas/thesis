Path Traversal — Demo 3

What this shows
- `/view?doc=` reads files based on user input with no validation, allowing directory traversal.
- CWE Mapping: CWE-22 (Improper Limitation of a Pathname to a Restricted Directory).

How to run
1) `cd PathTraversal/3_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3019`

How to demonstrate
- Normal: `doc=getting-started.txt` shows a public document.
- Path traversal: `doc=../private/credentials.txt` reads a sensitive file outside the docs folder.

Where the vulnerability lives
- `server.js`: `path.join(DOCS_DIR, doc)` is used without validation.

Fix talking points
- Normalize and validate requested paths; reject `..`, absolute paths, and separators.
- Map known document IDs to filenames server-side instead of accepting raw filenames.
- Keep sensitive files outside any directory reachable by user-controlled paths.

