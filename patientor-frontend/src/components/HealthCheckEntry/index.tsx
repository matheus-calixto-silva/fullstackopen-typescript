import HealingIcon from '@mui/icons-material/Healing';
import { HealthCheckEntry as IHealthCheckEntry } from "../../types";

const HealthCheckEntry = ({ entry }: { entry: IHealthCheckEntry }) => {
  return (
    <div style={{ border: "3px solid  black", margin: "0 0 10px 0", padding: "5px" }}>
      <p>{entry.date} <HealingIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnosed by: {entry.specialist}</p>
      <p>{entry.type}</p>
      <p>Health check rating: {entry.healthCheckRating}</p>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>Code: {code}</li>
        )}
      </ul>
    </div>
  );
};

export default HealthCheckEntry;