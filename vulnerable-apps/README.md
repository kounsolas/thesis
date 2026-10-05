# Vulnerable demo apps

> [!WARNING]
> Every app in this folder is vulnerable on purpose. `CommandInjection/1_code_example` runs any shell command it receives and `EvalInjection/1_code_example` evaluates any JavaScript it receives. Run the apps only on your own machine, never deploy them, and stop each server when you are done. All servers listen on `127.0.0.1` only.

Fifteen small demo applications, each built around a single vulnerability: fourteen Node.js/Express servers and one static page (`XSS/1_code_example`).

The eleven apps under `SQLi`, `XSS`, `PathTraversal` and `SSRF` are the AI-generated dataset of the thesis' first experiment (thesis §3.5 and Table 4.1). The other four are additional demos that the thesis does not evaluate.

## Running an app

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/<Category>/<N>_code_example
npm ci
npm start
```

Then open `http://localhost:<port>` with the port from the table below. Set the `PORT` environment variable to use another port. `XSS/1_code_example` is a static page with no server: open its `index.html` directly.

Each app's README gives the steps that trigger its vulnerability.

## Apps

Tries is the number of attempts the pipeline needed for a correct patch (thesis, Table 4.1).

| App | Vulnerability | CWE | Port | Vulnerable code | Thesis example | Tries |
|---|---|---|---|---|---|---|
| [SQLi/1_code_example](SQLi/1_code_example/) | SQL injection in a user search, `GET /search` | CWE-89 | 3001 | `server.js:37` | SQL Injection – Example 1 | 1 |
| [SQLi/2_code_example](SQLi/2_code_example/) | SQL injection in a login form, `POST /login` | CWE-89 | 3011 | `server.js:36-41` | SQL Injection – Example 2 | 1 |
| [SQLi/3_code_example](SQLi/3_code_example/) | SQL injection in a job search, `GET /search` | CWE-89 | 3018 | `server.js:36-45` | SQL Injection – Example 3 | 1 |
| [XSS/1_code_example](XSS/1_code_example/) | DOM-based XSS in a product search (static page) | CWE-79 | — | `main.js:27`, `main.ts:38` | XSS – Example 1 | 1 |
| [XSS/2_code_example](XSS/2_code_example/) | DOM-based XSS in a comment form | CWE-79 | 3016 | `main.js:11` | XSS – Example 2 | 1 |
| [PathTraversal/1_code_example](PathTraversal/1_code_example/) | Path traversal in a file download, `GET /download` | CWE-22 | 3006 | `server.js:18` | Path Traversal – Example 1 | 2 |
| [PathTraversal/2_code_example](PathTraversal/2_code_example/) | Path traversal in a file download, `GET /download` | CWE-22 | 3012 | `server.js:19` | Path Traversal – Example 2 | 1 |
| [PathTraversal/3_code_example](PathTraversal/3_code_example/) | Path traversal in a document viewer, `GET /view` | CWE-22 | 3019 | `server.js:17` | Path Traversal – Example 3 | 1 |
| [SSRF/1_code_example](SSRF/1_code_example/) | Server-side request forgery in a URL proxy, `POST /api/proxy` | CWE-918 | 3009 | `server.js:27` | SSRF – Example 1 | 1 |
| [SSRF/2_code_example](SSRF/2_code_example/) | Server-side request forgery in a URL proxy, `POST /api/proxy` | CWE-918 | 3010 | `server.js:28` | SSRF – Example 2 | 1 |
| [SSRF/3_code_example](SSRF/3_code_example/) | Server-side request forgery in a URL fetcher, `POST /api/fetch` | CWE-918 | 3017 | `server.js:29` | SSRF – Example 3 | 2 |
| [BrokenAccessControl/1_code_example](BrokenAccessControl/1_code_example/) | Insecure direct object reference, `GET /api/account/:id` | CWE-287 | 3002 | `server.js:19-27` | — | — |
| [CommandInjection/1_code_example](CommandInjection/1_code_example/) | OS command injection, `POST /api/run` | CWE-78 | 3007 | `server.js:18` | — | — |
| [EvalInjection/1_code_example](EvalInjection/1_code_example/) | Code injection through `eval`, `POST /api/eval` | CWE-95 | 3008 | `server.js:14` | — | — |
| [InsecureRedirects/1_code_example](InsecureRedirects/1_code_example/) | Open redirect, `GET /go` | CWE-601 | 3015 | `server.js:14` | — | — |

## Patched variants

`SQLi/3_code_example` and `InsecureRedirects/1_code_example` also contain `server.patched.js`: the same app with the vulnerability fixed. Stop the vulnerable server, then run `node server.patched.js` in the app folder (same port) and repeat the demonstration steps to see the difference.

## Notes

- `npm ci` reports deprecated packages and known vulnerabilities in the dependency trees. That is expected for these demos. Do not run `npm audit fix`: it would change the lockfiles.
- The three SQLi apps create and seed their SQLite database on first start. The database files are not tracked.
- The SSRF demonstrations make the server fetch `http://localhost:<port>/internal/...`. This needs Node.js 20 or newer; `http://127.0.0.1:<port>/internal/...` works as well.
