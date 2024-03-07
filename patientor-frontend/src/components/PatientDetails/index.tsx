import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Entries from "../Entries";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";

import { Patient } from "../../types";

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    (async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    })();
  }, [id]);

  while (patient === null) return <h1>Loading...</h1>;
  return (
    <section>
      <h1>{patient.name}
        <span>
          {patient.gender === "male" ? <MaleIcon />
            : patient.gender === "female" ? <FemaleIcon /> : <TransgenderIcon />}
        </span>
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>Entries</h3>
        <Entries id={patient.id} entries={patient.entries} />
      </div>
    </section>
  );
};

export default PatientDetails;