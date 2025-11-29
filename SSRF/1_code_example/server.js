const path = require('path');
const express = require('express');

const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Internal-only endpoint (simulates metadata/management service)
app.get('/internal/secret', (req, res) => {
  res.json({
    secret: 'FLAG-12345',
    note: 'Only internal services should see this, but SSRF can expose it.'
  });
});

// Intentionally vulnerable SSRF endpoint: fetches arbitrary URLs provided by the client.
// Demonstrates CWE-918 (Server-Side Request Forgery).
app.post('/api/proxy', async (req, res) => {
  const target = (req.body.url || '').toString();
  if (!target) {
    return res.status(400).json({ error: 'Provide a URL to fetch' });
  }

  try {
    const response = await fetch(target, { timeout: 5000 });
    const text = await response.text();
    res.json({ url: target, status: response.status, body: text.slice(0, 2000) });
  } catch (error) {
    res.status(500).json({ url: target, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`SSRF demo on http://localhost:${PORT}`);
});
