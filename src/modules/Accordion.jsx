import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

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
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
        >
            Accordion 1
          <Toggle checked={!disabled} onChange={handleToggle} />
        </AccordionSummary>
        <AccordionDetails>
          <Checkboxes
            title="My Title"
            options={["Option 1", "Option 2", "Option 3"]}
            disabled={disabled}
          />
        </AccordionDetails>
        <AccordionActions>
          <Button disabled={disabled}>Apply</Button>
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Text
          <InputSlider min={20} max={100} default={50} />
        </AccordionDetails>
        <AccordionActions>
          <Button>Apply</Button>
        </AccordionActions>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Apply</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
