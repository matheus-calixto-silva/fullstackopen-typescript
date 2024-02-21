import express from 'express';

import patientsService from '../services/patientsService';

import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedPatientEntry = patientsService.addPatient(newPatientEntry);
    patientsService.addPatient(addedPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;