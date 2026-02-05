const express = require('express');

const fetch = (...args) => import('node-fetch').then(({ default: fetchFn }) => fetchFn(...args));

const app = express();
const PORT = process.env.PORT || 3017;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Internal-only endpoint (simulates a metadata/service endpoint)
app.get('/internal/report', (_req, res) => {
  res.json({
    reportId: 'INT-9032',
    owner: 'Ops',
    secret: 'FLAG-SSRF-003',
    note: 'This should not be accessible externally.'
  });
});

app.post('/api/fetch', async (req, res) => {
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
  console.log(`SSRF demo #3 running at http://localhost:${PORT}`);
});

