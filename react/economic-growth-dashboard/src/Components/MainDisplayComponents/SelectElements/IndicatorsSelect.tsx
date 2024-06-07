import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IndicatorsSelectProps {
    setSearchIndicator: React.Dispatch<React.SetStateAction<string>>;
}

function IndicatorsSelect({setSearchIndicator}: IndicatorsSelectProps) {

  const [indicator, setIndicator] = React.useState('GDP');

  const handleChange = (event: SelectChangeEvent) => {
    setIndicator(event.target.value as string);
  };

  useEffect(()=> {
    setSearchIndicator(indicator);
  }, [indicator])

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="indicator-select">Indicator</InputLabel>
        <Select
          labelId="indicator-select"
          id="indicator"
          value={indicator}
          label="Indicator"
          onChange={handleChange}
        >
          <MenuItem value={"GDP"}>GDP</MenuItem>
          <MenuItem value={"GDP Per Capita PPP"}>GDP Per Capita PPP</MenuItem>
          <MenuItem value={"GDP Per Capita"}>GDP Per Capita</MenuItem>
          <MenuItem value={"GDP Growth Rate"}>GDP Growth Rate</MenuItem>
          <MenuItem value={"GDP Annual Growth Rate"}>GDP Annual Growth Rate</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default IndicatorsSelect