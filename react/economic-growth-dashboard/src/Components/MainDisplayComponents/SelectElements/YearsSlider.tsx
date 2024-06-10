import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface YearsSliderProps {
    setYear1: React.Dispatch<React.SetStateAction<string>>;
    setYear2: React.Dispatch<React.SetStateAction<string>>;
}

function valuetext(value: number) {
  return `${value}`;
}

const minDistance = 10;

function YearsSlider({setYear1, setYear2}: YearsSliderProps) {
  const [value, setValue] = React.useState<number[]>([1980, 2022]);

  useEffect(() => {
    setYear1(value[0].toString());
    setYear2(value[1].toString());
  }, [value])

  const minYear = 1960;
  const maxYear = 2022;
  const marks = [
    {
      value: 1960,
      label: '1960',
    },
    {
      value: 2022,
      label: '2022',
    }
  ];

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], maxYear - minDistance);
          setValue([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minYear + minDistance);
          setValue([clamped - minDistance, clamped]);
        }
      } else {
        setValue(newValue as number[]);
      }
  };

  return (
    <Box sx={{ width: 270 }} className="px-4">
        <Typography id="input-slider" gutterBottom>
        Historic Range
      </Typography>
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={minYear} 
        max={maxYear} 
        marks={marks}
        sx={{
          color: 'rgb(102, 128, 11)', // Main color for track and thumb
          '& .MuiSlider-thumb': {
            color: 'rgb(102, 128, 11)', // Thumb color
          },
          '& .MuiSlider-track': {
            color: 'rgb(135, 154, 57)', // Track color
          },
          '& .MuiSlider-rail': {
            color: 'grey', // Rail color
          },
          '& .MuiSlider-mark': {
            color: 'orange', // Mark color
          },
          '& .MuiSlider-markLabel': {
            color: 'rgb(16, 15, 15)', // Mark label color
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: 'rgb(111, 110, 105)', // Value label background color
            color: 'rgb(255, 252, 240)', // Value label text color
          },
        }}
      />
    </Box>
  );
}

export default YearsSlider