Broken Access Control — Intentionally Vulnerable Demo

What this shows
- Two broken access control flaws:
  1. Insecure Direct Object Reference (IDOR) — `/api/account/:id` returns any user record, no auth.
  2. Role tampering — `/api/admin?role=admin` trusts client-side role to grant admin data.

How to run
1. `cd BrokenAccessControl/1_code_example`
2. `npm install`
3. `npm start`
4. Browse to `http://localhost:3002`

Demonstration steps
- In “Account Lookup”, load ID 2 or 3 — you can read other users’ data.
- Click “View Admin Endpoint” — it pretends you are admin because the code blindly trusts `role=admin`.
- You can also try `curl http://localhost:3002/api/admin?role=admin` to see sensitive info without logging in.

Fix ideas for your lesson
- Require authentication and server-side session checks before returning account data.
- Enforce authorization rules on the server, not via query parameters supplied by the client.
- Use middleware to check user roles/permissions and ignore untrusted role inputs.

