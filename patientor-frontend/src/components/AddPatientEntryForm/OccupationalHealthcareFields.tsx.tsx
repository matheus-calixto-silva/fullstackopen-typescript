import { TextField } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface OccupationalHealthcareEntryProps {
  employerName: string;
  startDate: string; 
  endDate: string;   
  setEmployerName: (employerName: string) => void;
  setStartDate: (startDate: string) => void; 
  setEndDate: (endDate: string) => void;     
}

const OccupationalHealthcareFields = ({ employerName, startDate, endDate, setEmployerName, setStartDate, setEndDate }: OccupationalHealthcareEntryProps) => {
  return (
    <>
      <TextField
        label="employerName"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="startDate"
          fullWidth
          value={startDate ? dayjs(startDate) : null}
          onChange={(value) => setStartDate(value ? value.format('YYYY-MM-DD') : "")}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="endDate"
          fullWidth
          value={endDate ? dayjs(endDate) : null}
          onChange={(value) => setEndDate(value ? value.format('YYYY-MM-DD') : "")}
        />
      </LocalizationProvider>
    </>
  );
};

export default OccupationalHealthcareFields;