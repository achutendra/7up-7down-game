const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rollDice = require('./routes/route');

const calculateResult = require('./routes/route');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/roll-dice', rollDice);
app.use('/calculate-result', calculateResult);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});