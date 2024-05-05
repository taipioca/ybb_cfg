import React from "react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import "./DropdownMenu.css";

export default function Menu({ filters, setActiveFilter, activeFilter }) {
  return (
    <Select
      label="Select a filter"
      className="select-custom-width"
      value={activeFilter}
      onChange={(event) => {
        const value = event.target.value;
        setActiveFilter(value === "None" ? false : value);
      }}
    >
      <SelectSection title="Socioeconomic Filters" showDivider>
        {filters &&
          filters.map((filter) => (
            <SelectItem key={filter} value={filter}>
              {filter}
            </SelectItem>
          ))}
      </SelectSection>
      <SelectSection title="Race and Ethnicity" showDivider></SelectSection>
      <SelectSection title="Other"></SelectSection>
    </Select>
  );
}