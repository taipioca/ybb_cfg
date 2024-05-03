import React, { useEffect, useState } from "react";
import Accordion from "./modules/Accordion";
import CheckboxComponent from "./modules/Checkboxes";
import Box from "@mui/material/Box";
import AccordionNew from "./modules/Accordion-new";
import Dropdown from "./modules/DropdownMenu";
import "./Filters.css";

const Filters = ({ filters, setActiveFilter, activeFilter, categories, activeCategories, setActiveCategories }) => {
  return (
    <div>
      <p className="left-align-text component-spacing">
        Lorem ipsum dolor sit amet. Non omnis neque sed atque laboriosam qui
        eveniet vero. Non nihil eius et aspernatur pariatur ut sapiente
        obcaecati. Nam sequi internos aut quisquam odio et facilis nulla aut
        voluptatem dolore rem autem totam eum dolor excepturi id vero possimus!
        Sit pariatur dolorum qui beatae repudiandae qui quidem quia qui pariatur
        soluta id incidunt earum ea consectetur dolor aut consequatur illo. Aut
        velit rerum ad magni aliquam et sunt velit est corporis itaque aut
        ducimus omnis hic harum aspernatur. Sit voluptatem consequatur sed ipsam
        officia cum officia voluptate qui eaque dolore non voluptas nemo et
        consequatur minus. Et reiciendis itaque qui molestias fugit qui minima
        fugit ut dicta unde eos suscipit reiciendis.
      </p>
      <h2 className="component-spacing">Map Filter</h2>
      <Dropdown
        filters={filters}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        className="component-spacing"
      />
      <h2 className="component-spacing">Project Categories </h2>
      <CheckboxComponent
        categories={categories}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
      />
    </div>
  );
};

export default Filters;
