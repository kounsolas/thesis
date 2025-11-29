const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3005;

// Serve everything in this folder so index.html and vendor assets are reachable
app.use(express.static(__dirname));

// Endpoint that simulates grabbing a vendor manifest at runtime.
// Intentionally trusts the manifest content and passes it directly to the client.
app.get('/api/plugin-manifest', (req, res) => {
  const manifestPath = path.join(__dirname, 'vendor', 'manifest.json');
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    res.json(manifest);
  } catch (err) {
    res.status(500).json({ error: 'Manifest missing', details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Supply-chain demo running at http://localhost:${PORT}`);
});

