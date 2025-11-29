const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3004;
const DEBUG_MODE = process.env.DEBUG_MODE !== 'false'; // left enabled in production

app.use(express.json());

// Misconfiguration #1: serve the entire folder (including config/) as static assets
app.use(express.static(__dirname, { extensions: ['html'] }));

// Misconfiguration #2: debug endpoint left enabled exposes environment + config values
app.get('/api/debug/info', (req, res) => {
  if (!DEBUG_MODE) {
    return res.status(403).json({ error: 'Debug mode disabled' });
  }

  const configPath = path.join(__dirname, 'config', 'secret-config.json');
  let configContents = {};
  try {
    configContents = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (err) {
    configContents = { error: 'Could not read config', details: String(err) };
  }

  res.json({
    debugMode: DEBUG_MODE,
    processEnv: process.env,
    secretConfig: configContents
  });
});

app.listen(PORT, () => {
  console.log(`Security Misconfiguration demo running at http://localhost:${PORT}`);
  if (DEBUG_MODE) {
    console.log('WARNING: Debug mode is ON (intentional for demo)');
  }
});

