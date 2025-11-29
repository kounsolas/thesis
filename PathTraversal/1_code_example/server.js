const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3006;

const FILES_DIR = path.join(__dirname, 'files');

app.use(express.static(__dirname));

// Vulnerable download endpoint: trusts user-provided `file` query parameter.
// Attacker can use ../ sequences to read arbitrary files relative to project root.
app.get('/download', (req, res) => {
  const fileParam = (req.query.file || '').toString();
  if (!fileParam) {
    return res.status(400).json({ error: 'Provide ?file=somefile.txt' });
  }

  const requestedPath = path.join(FILES_DIR, fileParam);

  fs.readFile(requestedPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Could not read file', details: String(err) });
    }
    res.json({ file: fileParam, path: requestedPath, contents: data });
  });
});

app.listen(PORT, () => {
  console.log(`Path Traversal demo running on http://localhost:${PORT}`);
});

