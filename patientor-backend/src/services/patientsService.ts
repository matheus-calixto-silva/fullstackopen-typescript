import data from "../../data/patients";

import { PatientWithoutSsn } from "../types";

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatientsWithoutSsn
};