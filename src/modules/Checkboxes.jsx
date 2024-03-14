import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Checkboxes({ title, options }) {
  return (
    <div>
      <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
        {title}
      </Typography>
      <div role="group" aria-labelledby="sandwich-group">
        <List size="sm">
          {options.map((option, index) => (
            <ListItem key={index}>
              <FormControlLabel
                control={<Checkbox defaultChecked={index === 0} />}
                label={option}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}