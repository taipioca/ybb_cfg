import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
  font-size: 0.875rem;
`;

export default function InputSlider({ min, max, default: defaultValue, description = '', caption = '', units = '' }) {
  const [value, setValue] = React.useState(defaultValue);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? min : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom align="left" variant="body2" style={{ marginBottom: '20px' }}>
        {description}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption">{min}</Typography>
            <Typography variant="caption">{max}</Typography>
          </Box>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={min}
            max={max}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
      <Typography id="slider-value" gutterBottom align="left" variant="body2">
        {caption} <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          /> {units}
      </Typography>
    </Box>
  );
}