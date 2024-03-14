import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function SwitchControlled() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}