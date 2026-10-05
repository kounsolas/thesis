const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/api/eval', (req, res) => {
  const code = (req.body.code || '').toString();
  try {
    const result = eval(code);
    res.json({ code, result });
  } catch (error) {
    res.status(400).json({ code, error: error.message });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Eval/code injection demo on http://localhost:${PORT}`);
});

