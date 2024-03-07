import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheckEntry from "../HealthCheckEntry";
import HospitalEntry from "../HospitalEntry";
import OccupationalHealthcareEntry from "../OccupationalHealthcareEntry";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;