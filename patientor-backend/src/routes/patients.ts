import express from 'express';

import patientsService from '../services/patientsService';

import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSsn());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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

router.post('/:id/entries', (req, res) => {
  try {
    if (req.params.id && req.body) {
      const patient = patientsService.getPatientById(req.params.id);
      if (patient) {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addPatientEntry(patient, newEntry);
        res.json(addedEntry);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;