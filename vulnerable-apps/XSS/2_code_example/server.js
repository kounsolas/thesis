const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3016;

app.use(express.static(__dirname));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`XSS demo 2 running at http://localhost:${PORT}`);
});
