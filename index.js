const express = require('express');
const app = express();
app.use(express.json());

let lastCommand = "";

app.post('/cmd', (req, res) => {
    lastCommand = req.body.cmd || "";
    res.send("OK");
});

app.get('/cmd', (req, res) => {
    res.json({ cmd: lastCommand });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
