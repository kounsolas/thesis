# IDOR — Intentionally Vulnerable Demo

> **Intentionally vulnerable.** Run this app only on your own machine and never deploy it. The server listens on `127.0.0.1` only.

## What this shows

- Insecure Direct Object Reference (IDOR): `/api/account/:id` returns any account by ID with no auth/z checks.
- CWE Mapping: CWE-287 (Improper Authentication).

## How to run

Requires Node.js 20 or newer. From the repository root:

```bash
cd vulnerable-apps/BrokenAccessControl/1_code_example
npm ci
npm start
```

Then open http://localhost:3002.

The server prints nothing when it starts, so there is no start-up message to wait for.

## How to demonstrate

- Enter ID 2 or 3 in the page’s Account Lookup to view other users’ data.
- `curl http://localhost:3002/api/account/3` also returns a different user with no authentication.

## Where the vulnerability lives

- `server.js` lines 19–27: `GET /api/account/:id` returns the account for any client-supplied id; there is no authentication or authorization check before `res.json(account)` on line 26.

## Fix talking points

- Require authentication and enforce authorization before accessing resources.
- Use server-side ownership checks; do not trust client-supplied IDs.
- Prefer opaque references (e.g., UUIDs scoped to a user) over sequential IDs.
