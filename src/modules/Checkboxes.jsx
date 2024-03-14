import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Checkboxes({ description, options }) {
  return (
    <div>
      <Typography id="sandwich-group" align="left" variant="body2" mb={1}>
        {description}
      </Typography>
      <div role="group" aria-labelledby="sandwich-group">
        <List size="sm">
          {options.map((option, index) => (
            <ListItem key={index} style={{ padding: "0px", margin: "0px" }}>
              <FormControlLabel
                control={<Checkbox defaultChecked={index === 0} size="small" />}
                label={<Typography variant="caption">{option}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
