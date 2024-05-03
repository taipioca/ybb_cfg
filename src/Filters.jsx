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
        YouthBuild Boston (YBB) was founded in 1990 with the goal of providing
        underserved young people with the support and credentials needed to
        successfully enter the construction and design industry. YouthBuild
        Boston envisions a city rich with opportunity for all young people, and
        a building trades sector which is diverse, equitable and inclusive. We
        envision a region with a strong supply of affordable housing and an
        economy which provides pathways for everyone to thrive.
      </p>


      <p className="left-align-text component-spacing">
        Use this interactive map to explore the projects that YouthBuild Boston
        has worked on in the Greater Boston area. Click on the markers to learn
        more about each project. Click on filters to see projects by category,
        as well as community distribution in various statistics.
      </p>

      <h2 className="filter-title-spacing">Choose a Map Filter</h2>
      <Dropdown
        filters={filters}
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        className="component-spacing"
      />
      <h2 className="filter-title-spacing">Project Categories </h2>
      <CheckboxComponent
        categories={categories}
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
      />
    </div>
  );
};

export default Filters;
