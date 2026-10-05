const express = require('express');

const app = express();
const PORT = process.env.PORT || 3015;

app.use(express.static(__dirname));

// Patched: redirects only to allowlisted targets (the vulnerable version is server.js)
app.get('/go', (req, res) => {
  const target = (req.query.target || '').toString();
  if (!target) {
    return res.status(400).send('Missing target');
  }
  const allowedTargets = ['/planes', '/trains', '/automobiles'];
  if (!allowedTargets.includes(target)) {
    return res.status(406).send('Not Acceptable');
  }
  res.redirect(target);
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Open redirect demo running at http://localhost:${PORT}`);
});

