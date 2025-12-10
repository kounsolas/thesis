DOM XSS — Demo 2

What this shows
- Unsanitized user input rendered with `innerHTML` in a comment form (DOM-based XSS).
- CWE Mapping: CWE-79 (Improper Neutralization of Input During Web Page Generation).

How to run
1) `cd XSS/2_code_example`
2) `npm install`
3) `npm start`
4) Open `http://localhost:3016`

How to demonstrate
- Post a normal comment to see expected behavior.
- Post `<b style="color:red">Injected via XSS</b>` to see script execution when rendered.
- Note that both name and message fields are injected directly into the DOM without encoding or sanitization.

Where the vulnerability lives
- `main.js`: renders user input with `innerHTML` (DOM XSS).

Fix talking points
- Render untrusted input with `textContent`/`innerText`, or sanitize with a vetted library.
- Disallow/encode HTML in user-supplied fields; consider a strict Content Security Policy (CSP).

