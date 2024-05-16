// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/trades", require("./routes/tradeRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

