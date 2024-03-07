import { SyntheticEvent, useState } from "react";

import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { EntryType, HealthCheckRating, PatientEntryFormValues } from "../../types";
import HealthCheckEntryField from "./HealthCheckEntryField";
import HospitalFields from "./HospitalFields.tsx";
import OccupationalHealthcare from "./OccupationalHealthcareFields.tsx";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientEntryFormValues) => void;
}

const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setdate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    if (typeof e.target.value === "string") {
      const value = e.target.value;
      const entry = Object.values(EntryType).find(e => e.toString() === value);
      if (entry) {
        setType(entry);
      }
    }
  };

  const addPatient = (e: SyntheticEvent) => {
    e.preventDefault();
    const parsediagnosisCodes = diagnosisCodes.length > 0 ? diagnosisCodes.split(', ') : [];
    const entryToSubmit = {
      date,
      description,
      specialist,
      diagnosisCodes: parsediagnosisCodes,
      type
    };

    if (type === "HealthCheck") {
      const objToSend = {
        ...entryToSubmit,
        healthCheckRating
      };
      onSubmit(objToSend);
    }

    if (type === "OccupationalHealthcare") {
      const objToSend = {
        ...entryToSubmit,
        employerName,
        sickLeave: {
          startDate,
          endDate
        }
      };
      onSubmit(objToSend);
    }


    if (type === "Hospital") {
      const objToSend = {
        ...entryToSubmit,
        employerName,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      };
      onSubmit(objToSend);
    }

  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Diagnosis Codes (Separated by ', ')"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Date"
            fullWidth
            value={dischargeDate ? dayjs(date) : null}
            onChange={(value) => setdate(value ? value.format('YYYY-MM-DD') : "")}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={handleTypeChange}
        >
          {Object.values(EntryType).map((entryType) => (
            <MenuItem key={entryType} value={entryType}>
              {entryType}
            </MenuItem>
          ))}
        </Select>

        {type === "HealthCheck" && <HealthCheckEntryField selectedRating={healthCheckRating} onSelectRating={setHealthCheckRating} />}
        {type === "Hospital" && <HospitalFields
          dischargeDate={dischargeDate}
          dischargeCriteria={dischargeCriteria}
          setDischargeDate={setDischargeDate}
          setDischargeCriteria={setDischargeCriteria}
        />}
        {type === "OccupationalHealthcare" && <OccupationalHealthcare
          startDate={startDate}
          endDate={endDate}
          employerName={employerName}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setEmployerName={setEmployerName} />}



        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;