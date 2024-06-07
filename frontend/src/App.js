import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography, Container, Box } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [betAmount, setBetAmount] = useState(100);
    const [betType, setBetType] = useState('up');
    const [dice, setDice] = useState({ die1: null, die2: null });
    const [points, setPoints] = useState(5000);
    const [result, setResult] = useState('');

    const rollDice = async () => {
        const response = await axios.post('http://localhost:5000/roll-dice');
        const { die1, die2, sum } = response.data;
        setDice({ die1, die2 });

        const resultResponse = await axios.post('http://localhost:5000/calculate-result', {
            betAmount,
            betType,
            sum,
            currentPoints: points
        });

        setResult(resultResponse.data.result);
        setPoints(resultResponse.data.newPoints);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Points: {points}</Typography>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Select value={betAmount} onChange={(e) => setBetAmount(e.target.value)}>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                </Select>
                <Select value={betType} onChange={(e) => setBetType(e.target.value)}>
                    <MenuItem value="up">7 Up</MenuItem>
                    <MenuItem value="down">7 Down</MenuItem>
                    <MenuItem value="seven">Lucky 7</MenuItem>
                </Select>
                <Button variant="contained" onClick={rollDice}>Roll Dice</Button>
                {dice.die1 !== null && <Typography variant="h5">Dice: {dice.die1}, {dice.die2}</Typography>}
                {result && <Typography variant="h6">Result: {result}</Typography>}
            </Box>
        </Container>
    );
};

export default App;
