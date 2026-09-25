const express = require('express');
const app = express();
app.use(express.json({ limit: '4mb' }));

const commands = [];        // {id, target, code(b64), ts}
let nextId = 1;
const MAX_QUEUE = 300;

app.get('/', (_, res) => res.send('ok'));

app.post('/push', (req, res) => {
  const { target, code } = req.body || {};
  if (!code || typeof code !== 'string') return res.status(400).json({ ok:false });
  const cmd = { id: nextId++, target: target || 'ALL', code, ts: Date.now() };
  commands.push(cmd);
  if (commands.length > MAX_QUEUE) commands.shift();
  res.json({ ok:true, id: cmd.id });
});

app.get('/pull', (req, res) => {
  const since = parseInt(req.query.since || '0', 10) || 0;
  const out = commands.filter(c => c.id > since);
  res.json({ ok:true, commands: out });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('up on', PORT));
