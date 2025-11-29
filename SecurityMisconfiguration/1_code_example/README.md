Security Misconfiguration — Intentionally Vulnerable Demo

What this shows
- Debug mode left enabled in production (`/api/debug/info` dumps env variables + secrets).
- Static hosting misconfiguration serves the entire directory, so sensitive files under `config/` are public.

CWE Mapping
- CWE-16: Configuration issues (debug mode exposed in production).
- CWE-552: Files or Directories Accessible to External Parties (`config/secret-config.json`).

Run locally
1. `cd SecurityMisconfiguration/1_code_example`
2. `npm install`
3. `npm start`
4. Visit `http://localhost:3004`

Demo steps
- Click “Fetch Debug Info” to see how the endpoint reveals process env + secret config.
- Open `http://localhost:3004/config/secret-config.json` to download secrets directly.

Teaching notes / Fix ideas
- Disable debug endpoints (set `DEBUG_MODE=false`) before production deployment.
- Serve only the specific static assets needed (e.g., `/public`), not entire app directories.
- Apply least privilege and implement deny-by-default routing for sensitive files.
