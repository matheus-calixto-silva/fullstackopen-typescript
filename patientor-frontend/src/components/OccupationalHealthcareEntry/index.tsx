import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry as IOccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntry = ({ entry }: { entry: IOccupationalHealthcareEntry }) => {
  return(
    <div style={{ border: "3px solid  black", margin: "0 0 10px 0", padding: "5px" }}>
      <p>{entry.date} <WorkIcon/></p>
      <p>{entry.description}</p>
      <p>Diagnosed by: {entry.specialist}</p>
      <p>{entry.type}</p>
      <p>Employer: {entry.employerName}</p>
      <p>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>Code: {code}</li>
        )}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntry;