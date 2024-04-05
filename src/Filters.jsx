import React, { useEffect, useState } from "react";
import Accordion from "./modules/Accordion";
import Checkboxes from "./modules/Checkboxes";
import Box from "@mui/material/Box";
import AccordionNew from "./modules/Accordion-new";
import Dropdown from "./modules/DropdownMenu";
const Filters = ({filters, setActiveFilter, activeFilter}) => {
  return (
    <div>
      <Dropdown filters={filters} setActiveFilter={setActiveFilter} activeFilter={activeFilter} />
    </div>
  );
};

export default Filters;
