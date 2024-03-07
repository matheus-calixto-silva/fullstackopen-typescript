import { TextField } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface HospitalProps {
  dischargeDate: string; 
  dischargeCriteria: string;   
  setDischargeDate: (dischargeDate: string) => void; 
  setDischargeCriteria: (dischargeCriteria: string) => void;     
}

const HospitalFields = ({ dischargeDate, dischargeCriteria, setDischargeDate, setDischargeCriteria }: HospitalProps) => {
  return (
    <>
      <TextField
        label="Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="dischargeDate"
          fullWidth
          value={dischargeDate ? dayjs(dischargeDate) : null}
          onChange={(value) => setDischargeDate(value ? value.format('YYYY-MM-DD') : "")}
        />
      </LocalizationProvider>
    </>
  );
};

export default HospitalFields;