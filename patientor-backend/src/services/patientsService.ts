import { v4 as uuid } from 'uuid';
import patientEntries from "../../data/patients";

import { Entry, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from "../types";

const getPatientsWithoutSsn = (): NonSensitivePatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return id ? patientEntries.find(p => p.id === id) : undefined;
};


const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patientEntries.push(newPatientEntry);

  return newPatientEntry;
};

const addPatientEntry = (patient: Patient, entry: EntryWithoutId): Entry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };
  
  patient.entries.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatientsWithoutSsn,
  getPatientById,
  addPatient,
  addPatientEntry
};