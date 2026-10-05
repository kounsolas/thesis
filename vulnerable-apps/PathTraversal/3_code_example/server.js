const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3019;
const DOCS_DIR = path.join(__dirname, 'docs');

app.use(express.static(__dirname));

app.get('/view', (req, res) => {
  const doc = (req.query.doc || '').toString();
  if (!doc) {
    return res.status(400).send('Provide ?doc=filename');
  }

  const filePath = path.join(DOCS_DIR, doc);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Document not found');
    }
    res.type('text/plain').send(data);
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Path Traversal demo #3 running at http://localhost:${PORT}`);
});

