import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HospitalEntry as IHospitalEntry } from "../../types";

const HospitalEntry = ({ entry }: { entry: IHospitalEntry }) => {
  return (
    <div style={{ border: "3px solid  black", margin: "0 0 10px 0", padding: "5px" }}>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnosed by: {entry.specialist}</p>
      <p>{entry.type}</p>
      <p>Discharge date: {entry.discharge.date}</p>
      <p>Discharge criteria: {entry.discharge.criteria}</p>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>Code: {code}</li>
        )}
      </ul>
    </div>
  );
};

export default HospitalEntry;