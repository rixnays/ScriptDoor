const express = require('express');
const app = express();
app.use(express.json());

let lastCommand = { target: "", code: "", id: 0 };

app.post('/cmd', (req, res) => {
    const { target, code } = req.body;
    if (target && code) {
        lastCommand = { target, code, id: Date.now() };
        console.log("Komut Alındı:", lastCommand);
        return res.json({ success: true });
    }
    return res.status(400).json({ error: "Eksik parametre" });
});

app.get('/cmd', (req, res) => {
    res.json(lastCommand);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server aktif: ${PORT}`));
