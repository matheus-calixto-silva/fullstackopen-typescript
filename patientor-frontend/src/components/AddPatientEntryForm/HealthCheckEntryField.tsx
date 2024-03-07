import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface HealthCheckEntryFieldProps {
  selectedRating: HealthCheckRating;
  onSelectRating: (rating: HealthCheckRating) => void;
}

const HealthCheckEntryField = ({ selectedRating, onSelectRating }: HealthCheckEntryFieldProps) => {
  const inputValues = Object.entries(HealthCheckRating).map(([key, value]) => {
    return { key, value };
  });
  const filteredValues = inputValues.slice(Math.floor(inputValues.length / 2));

  const handleChange = (e: SelectChangeEvent<number>) => {
    e.preventDefault();
    const selectedValue = typeof e.target.value === 'number' ? e.target.value : parseInt(e.target.value);
    onSelectRating(selectedValue);
  };

  return (
    <>
      <InputLabel htmlFor="health-check-rating">Health Check Rating:</InputLabel>
      <Select
        id="health-check-rating"
        name="health-check-rating"
        value={selectedRating}
        onChange={handleChange}
        fullWidth
      >
        {filteredValues.map(({ key, value }) => (
          <MenuItem key={key} value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default HealthCheckEntryField;