import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
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
      {filters &&
        filters.map((filter) => (
          <SelectItem key={filter} value={filter}>
            {filter}
          </SelectItem>
        ))}
    </Select>
  );
}
