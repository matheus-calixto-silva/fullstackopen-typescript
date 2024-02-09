import data from "../../data/diagnostics";

import { Diagnosis } from "../types";

const getDiagnosis = (): Diagnosis[] => {
  return data;
};

export default {
  getDiagnosis
};