import React from "react";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function Menu({filters, setActiveFilter, activeFilter}) {
  let dropdownItems = [];
  if (filters){
    dropdownItems = filters.map((filter)=>{
    return(
      <DropdownItem key={filter}>
          {filter}
      </DropdownItem>
    )
  })}

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {activeFilter}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([activeFilter])}
        onSelectionChange={(keys) => {
          const selected_option = Array.from(keys)[0]
          setActiveFilter(selected_option == "None" ? false: selected_option)}}
        >
        {dropdownItems}
      </DropdownMenu>
    </Dropdown>
  );
}
