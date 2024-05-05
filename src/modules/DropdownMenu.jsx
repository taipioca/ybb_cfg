import React, { useEffect, useState } from "react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import "./DropdownMenu.css";

export default function Menu({ filters, setActiveFilter, activeFilter }) {
  const [options, setOptions] = useState(null); 
  useEffect(()=>{
    if (filters){
      setOptions(filters.map((filter)=>{
        if ((typeof(filter) != "string")){
          return(
          <SelectSection key={filter.title} title={filter.title} showDivider>
          {filter.filters.map((subFilter) => (
              <SelectItem key={subFilter} value={subFilter}>
                {subFilter}
              </SelectItem>
            ))}
        </SelectSection>
        )
        }
        else{
          return(
          <SelectItem key={filter} value={filter}>
                {filter}
          </SelectItem>)
        }
      }))
    }
  }, [filters])
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
      {options}
    </Select>
  );
}