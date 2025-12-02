const express = require('express');
const path = require('path');

const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/internal/config', (req, res) => {
  res.json({
    dbPassword: 'super-secret-password',
    token: 'FLAG-SSRF-002',
    note: 'Internal-only metadata; should not be reachable externally.'
  });
});

app.post('/api/proxy', async (req, res) => {
  const target = (req.body.url || '').toString();
  if (!target) {
    return res.status(400).json({ error: 'Provide a URL to fetch' });
  }

  try {
    const allowedHosts = new Set(['example.com', 'github.com']);
    const url = new URL(target);
    if (!allowedHosts.has(url.hostname) || !['http:', 'https:'].includes(url.protocol)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    const response = await fetch(target, { timeout: 5000 });
    //const response = await fetch(target, { timeout: 5000 });
    const text = await response.text();
    res.json({ url: target, status: response.status, body: text.slice(0, 2000) });
  } catch (error) {
    res.status(500).json({ url: target, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`SSRF demo #2 running at http://localhost:${PORT}`);
});

