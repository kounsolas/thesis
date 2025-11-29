Software Supply Chain Failure — Intentionally Vulnerable Demo

What this shows
- The app blindly trusts a third-party plugin manifest and executes whatever scripts it lists.
- CWE Mapping: CWE-447 (Reliance on Untrusted Inputs in a Security Decision).

How to run
1. `cd SoftwareSupplyChainFailure/1_code_example`
2. `npm install`
3. `npm start`
4. Open `http://localhost:3005`

Demo steps
- Click “Fetch & Execute Plugins”. The page calls `/api/plugin-manifest`, loops through the plugins array, and injects each script with `<script src="...">`.
- The provided plugin (`vendor/plugins/feedback-widget.js`) simulates a compromised dependency by logging cookies and showing a banner.
- Explain how anyone who can tamper with the manifest/CDN gains full script execution in your app.

Where the vulnerability lives
- `server.js` serves `/api/plugin-manifest` directly from vendor files (no validation/sig checks).
- `index.html` (inline script) iterates the manifest and appends `<script>` tags for each untrusted URL.

Fix ideas for your session
- Pin plugin versions and verify signatures/hashes before execution.
- Maintain an allowlist; review vendor updates before deploying.
- Serve only vetted assets from your own domain and avoid runtime evaluation of vendor manifests.

