import axios from "axios";
import { Entry, Patient, PatientEntryFormValues, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string | undefined) => {
  if (id) {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    return data;
  }

  return null;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string | undefined, object: PatientEntryFormValues) => {
  if (id) {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );
    return data;
  }

  return null;
};

export default {
  getAll, getById, create, createEntry
};

