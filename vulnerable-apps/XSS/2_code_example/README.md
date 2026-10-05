# DOM XSS — Demo 2

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Unsanitized user input rendered with `innerHTML` in a comment form (DOM-based XSS).
- CWE Mapping: CWE-79 (Improper Neutralization of Input During Web Page Generation).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/XSS/2_code_example
npm ci
npm start
```

Then open http://localhost:3016.

## How to demonstrate

- Post a normal comment to see expected behavior.
- Post `<b style="color:red">Injected via XSS</b>` to see script execution when rendered.
- Note that both name and message fields are injected directly into the DOM without encoding or sanitization.

## Where the vulnerability lives

- `main.js` line 11: renders user input with `innerHTML` (DOM XSS). In `appendComment`, `div.innerHTML` is built by concatenating `name` and `message`.

## Fix talking points

- Render untrusted input with `textContent`/`innerText`, or sanitize with a vetted library.
- Disallow/encode HTML in user-supplied fields; consider a strict Content Security Policy (CSP).
