const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(__dirname));
app.disable('x-powered-by'); // reduce server fingerprinting

// Fake database
const accounts = [
  { id: 1, name: 'Alice (admin)', role: 'admin', balance: 1000 },
  { id: 2, name: 'Bob (standard)', role: 'user', balance: 250 },
  { id: 3, name: 'Charlie (standard)', role: 'user', balance: 400 }
];

// IDOR: trusts client-provided id with no authentication/authorization
app.get('/api/account/:id', (req, res) => {
  const id = Number(req.params.id);
  const account = accounts.find((acct) => acct.id === id);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  // No auth / session check here! Any visitor can read any account.
  res.json(account);
});

app.listen(PORT, () => {
  // intentionally quiet to avoid leaking details via logs
});
