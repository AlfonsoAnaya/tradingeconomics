import * as React from 'react';
import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface CountriesRadioSelectProps {
    setCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

function CountriesRadioSelect({setCountries}: CountriesRadioSelectProps) {
  
  const [checkedCountries, setCheckedCountries] = useState<string[]>(['Mexico','Thailand','New Zealand','Sweden']);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    // Update checked countries based on checkbox state
    if (checked) {
      setCheckedCountries((prevChecked) => [...prevChecked, name]);
    } else {
      setCheckedCountries((prevChecked) => prevChecked.filter((country) => country !== name));
    }
  };

  useEffect(() => {
    setCountries(checkedCountries)
  }, [checkedCountries]);

  return (
    <FormGroup className="checkbox-group [&>*]:h-[30px]">
      <FormControlLabel
        control={<Checkbox name="Mexico" checked={checkedCountries.includes('Mexico')} onChange={handleCheckboxChange} sx={{
          color: "rgb(102, 128, 11)", // Unchecked color
          '&.Mui-checked': {
            color: 'rgb(102, 128, 11)', // Checked color
          },
        }}/>}
        label="Mexico"
      />
      <FormControlLabel
      className="md:w-auto w-[45%]"
        control={<Checkbox name="Thailand" checked={checkedCountries.includes('Thailand')} onChange={handleCheckboxChange} sx={{
          color: "rgb(102, 128, 11)", // Unchecked color
          '&.Mui-checked': {
            color: 'rgb(102, 128, 11)', // Checked color
          },
        }}/>}
        label="Thailand"
      />
      <FormControlLabel
        control={<Checkbox name="New Zealand" checked={checkedCountries.includes('New Zealand')} onChange={handleCheckboxChange} sx={{
          color: "rgb(102, 128, 11)", // Unchecked color
          '&.Mui-checked': {
            color: 'rgb(102, 128, 11)', // Checked color
          },
        }}/>}
        label="New Zealand"
      />
      <FormControlLabel
        className="md:w-auto w-[45%]"
        control={<Checkbox name="Sweden" checked={checkedCountries.includes('Sweden')} onChange={handleCheckboxChange} sx={{
          color: "rgb(102, 128, 11)", // Unchecked color
          '&.Mui-checked': {
            color: 'rgb(102, 128, 11)', // Checked color
          },
        }}/>}
        label="Sweden"
      />
    </FormGroup>
  );
}

export default CountriesRadioSelect