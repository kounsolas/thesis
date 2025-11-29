const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static(__dirname));

// Fake database
const accounts = [
  { id: 1, name: 'Alice (admin)', role: 'admin', balance: 1000 },
  { id: 2, name: 'Bob (standard)', role: 'user', balance: 250 },
  { id: 3, name: 'Charlie (standard)', role: 'user', balance: 400 }
];

// Intentionally broken access control: trusts client-provided userId
app.get('/api/account/:id', (req, res) => {
  const id = Number(req.params.id);
  const account = accounts.find((acct) => acct.id === id);
  if (!account) {
    return res.status(404).json({ error: 'Account not found' });
  }
  // No auth / session check here! Any visitor can read any account.
  res.json(account);
});

// Extra endpoint to demonstrate privilege escalation via query parameter
app.get('/api/admin', (req, res) => {
  const role = req.query.role || 'user';
  if (role === 'admin') {
    return res.json({
      role,
      message: 'Sensitive admin data: system backups, user export link, etc.'
    });
  }
  res.status(403).json({ error: 'Only admins should see this, but role can be faked.' });
});

app.listen(PORT, () => {
  console.log(`Broken Access Control demo running on http://localhost:${PORT}`);
});

