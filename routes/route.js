const express = require('express');

const router = express.Router();

// Endpoint to generate dice roll
router.post('/roll-dice', (req, res) => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const sum = die1 + die2;
    res.json({ die1, die2, sum });
});

// Endpoint to calculate result
router.post('/calculate-result', (req, res) => {
    const { betAmount, betType, sum, currentPoints } = req.body;
    let result;
    let newPoints = currentPoints;

    if ((sum < 7 && betType === 'down') || (sum > 7 && betType === 'up')) {
        result = 'win';
        newPoints += betAmount * 2;
    } else if (sum === 7 && betType === 'seven') {
        result = 'win';
        newPoints += betAmount * 5;
    } else {
        result = 'lose';
        newPoints -= betAmount;
    }

    res.json({ result, newPoints });
});


module.exports = router