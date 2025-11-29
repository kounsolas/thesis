const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Intentionally vulnerable endpoint: evaluates arbitrary JS from the client
// Demonstrates code injection via eval (CWE-95)
app.post('/api/eval', (req, res) => {
  const code = (req.body.code || '').toString();
  try {
    // eslint-disable-next-line no-eval
    const result = eval(code);
    res.json({ code, result });
  } catch (error) {
    res.status(400).json({ code, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Eval/code injection demo on http://localhost:${PORT}`);
});

