import express from 'express';

import { calculateBmi } from './bmiCalculator';
import isNumber from './utils';

const app = express();
const PORT = 3000;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = req.query.weight;
  const height = req.query.height;

  if (isNumber(weight) && isNumber(height)) {
    const bmi = calculateBmi(Number(height), (Number(weight)));

    res.json({ weight, height, bmi });
  }

  res.json({ error: "malformatted parameters" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
