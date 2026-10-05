IDOR — Intentionally Vulnerable Demo

What this shows
- Insecure Direct Object Reference (IDOR): `/api/account/:id` returns any account by ID with no auth/z checks.
- CWE Mapping: CWE-287 (Improper Authentication).

How to run
1) `cd BrokenAccessControl/1_code_example`
2) `npm install`
3) `npm start`
4) Visit `http://localhost:3002`

How to demonstrate
- Enter ID 2 or 3 in the page’s Account Lookup to view other users’ data.
- `curl http://localhost:3002/api/account/3` also returns a different user with no authentication.

Fix talking points
- Require authentication and enforce authorization before accessing resources.
- Use server-side ownership checks; do not trust client-supplied IDs.
- Prefer opaque references (e.g., UUIDs scoped to a user) over sequential IDs.
