const express = require('express');
const app = express();
app.use(express.json());

let currentCommand = "";

// Ana hesaptan komut alma
app.post('/cmd', (req, res) => {
    if (req.body && req.body.cmd) {
        currentCommand = req.body.cmd;
        console.log("Komut kaydedildi:", currentCommand);
        return res.status(200).json({ success: true });
    }
    return res.status(400).json({ error: "No cmd provided" });
});

// Yan hesapların komutu çekmesi
app.get('/cmd', (req, res) => {
    res.json({ cmd: currentCommand });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
