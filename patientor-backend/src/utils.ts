import { Diagnosis, EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string');
  }
  return string;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(value => Number(value)).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (typeof healthCheckRating !== 'number' || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
  if (object !== null && typeof object === 'object' && ('startDate' in object && 'endDate' in object)) {
    const newSickLeave = {
      startDate: parseString(object.startDate),
      endDate: parseString(object.endDate)
    };

    return newSickLeave;
  }

  throw new Error('Incorrect or missing SickLeave: ' + object);
};

const parseDischarge = (object: unknown): { date: string, criteria: string } => {
  if (object !== null && typeof object === 'object' && ('date' in object && 'criteria' in object)) {

    const newDischarge = {
      date: parseString(object.date),
      criteria: parseString(object.criteria)
    };

    return newDischarge;
  }

  throw new Error('Incorrect or missing Discharge: ' + object);
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('healthCheckRating' in object)) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
    const newPatientEntry: EntryWithoutId = {
      type: "HealthCheck",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('employerName' in object)) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object && 'sickLeave' in object) {
    const newPatientEntry: EntryWithoutId = {
      type: "OccupationalHealthcare",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave)
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object' || !('discharge' in object)) {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
    const newPatientEntry: EntryWithoutId = {
      type: "Hospital",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      discharge: parseDischarge(object.discharge)
    };
    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (object !== null && typeof object === 'object' && ('type' in object)) {
    switch (object.type) {
      case "HealthCheck":
        return toNewHealthCheckEntry(object);
      case "OccupationalHealthcare":
        return toNewOccupationalHealthcareEntry(object);
      case "Hospital":
        return toNewHospitalEntry(object);
      default:
        throw new Error('Incorrect or missing type');
    }
  }

  throw new Error('Incorrect or missing data');
};