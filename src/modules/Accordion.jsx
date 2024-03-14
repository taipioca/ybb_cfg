import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import InputSlider from "./Slider";
import Checkboxes from "./Checkboxes";
import Toggle from "./Toggle";

import "./Accordion.css";

export default function AccordionUsage() {
  const [disabled, setDisabled] = React.useState(false);

  const handleToggle = () => {
    setDisabled(!disabled);
  };

  return (
    <div>
      <Accordion defaultExpanded disabled={disabled}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <Typography>Example Filter (multiple select)</Typography>
              <ExpandMoreIcon />
            </Box>
            <Toggle checked={disabled} onChange={handleToggle} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%" display="flex" justifyContent="center">
            <Box width="90%">
              <Checkboxes
                description="Select project categories to include in your search:"
                options={["Option 1", "Option 2", "Option 3"]}
                disabled={disabled}
              />
            </Box>
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button disabled={disabled}>Apply</Button>
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded disabled={disabled}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center">
              <Typography>Poverty Percentage</Typography>
              <ExpandMoreIcon />
            </Box>
            <Toggle checked={disabled} onChange={handleToggle} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%" display="flex" justifyContent="center">
            <Box width="90%">
              <InputSlider
                description="Percent of citizens living below the poverty line:"
                min={0}
                max={100}
                default={50}
                caption="Up to "
                units="%"
              />
            </Box>
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <Button disabled={disabled}>Apply</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}