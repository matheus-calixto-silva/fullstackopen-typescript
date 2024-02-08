import express from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises, exerciseValues } from './calculateExercises';
import isNumber from './utils';

const app = express();
const PORT = 3000;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyHours }: exerciseValues = req.body;

  if (isNumber(dailyHours.every(value => isNumber(value))) && isNumber(target)) {
    const result = calculateExercises(target, dailyHours);

    res.json(result);
  }

  res.json({ error: "malformatted parameters" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
