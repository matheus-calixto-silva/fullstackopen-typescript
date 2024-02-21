import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
  try {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newEntry = {
      name, dateOfBirth, ssn, gender, occupation
    };
    patientsService.addPatient(newEntry);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;