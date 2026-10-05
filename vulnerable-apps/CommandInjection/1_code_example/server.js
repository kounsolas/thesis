const path = require('path');
const { exec } = require('child_process');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/api/run', (req, res) => {
  const cmd = (req.body.cmd || '').toString();
  if (!cmd.trim()) {
    return res.status(400).json({ error: 'Provide a command to run' });
  }

  exec(cmd, { timeout: 5000 }, (error, stdout, stderr) => {
    res.json({
      command: cmd,
      stdout,
      stderr,
      error: error ? error.message : null
    });
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Command Injection demo on http://localhost:${PORT}`);
});

