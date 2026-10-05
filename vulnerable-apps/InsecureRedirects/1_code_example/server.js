const express = require('express');

const app = express();
const PORT = process.env.PORT || 3015;

app.use(express.static(__dirname));

// Vulnerable: redirects to any URL supplied by the user (open redirect)
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
  // const target = (req.query.target || '').toString();
  // if (!target) {
  //   return res.status(400).send('Missing target');
  // }
  // res.redirect(target);
});

app.listen(PORT, () => {
  console.log(`Open redirect demo running at http://localhost:${PORT}`);
});

