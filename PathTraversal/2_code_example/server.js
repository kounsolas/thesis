const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3012;
const FILE_ROOT = path.join(__dirname, 'files');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/download', (req, res) => {
  const fileParam = (req.query.file || '').toString();
  if (!fileParam) {
    return res.status(400).json({ error: 'Provide ?file=...' });
  }

  const filePath = path.join(FILE_ROOT, fileParam);
  // const sanitizedPath = fileParam.replace(/^(\.\.(\/|\\\\|$))+/, '');
  // if (sanitizedPath.indexOf('\0') !== -1) {
  //   return res.status(404).json({ error: 'Could not read file', details: 'Invalid file path' });
  // }
  // const filePath = path.join(FILE_ROOT, sanitizedPath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Could not read file', details: String(err) });
    }
    res.json({ requested: fileParam, resolved: filePath, contents: data });
  });
});

app.listen(PORT, () => {
  console.log(`Path Traversal demo #2 running on http://localhost:${PORT}`);
});

