import { v4 as uuid } from 'uuid';
import data from "../../data/patients";

import { NewPatient, Patient, PatientWithoutSsn } from "../types";


const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };
  
  data.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatientsWithoutSsn,
  addPatient
};