import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function App({ selectedKey, setSelectedKey }) {
  const selectedValue = React.useMemo(
    () => selectedKey ? selectedKey.replaceAll("_", " ") : "",
    [selectedKey]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([selectedKey])}
        onSelectionChange={(keys) => setSelectedKey(Array.from(keys)[0])}
      >
        <DropdownItem key="Select_Overlay">Select overlay</DropdownItem>
        <DropdownItem key="Median_Household_Income_(2015)">
          Median Household Income (2015)
        </DropdownItem>
        <DropdownItem key="Residents_without_a_High_School_Diploma">
          Residents without a High School Diploma (2015)
        </DropdownItem>
        <DropdownItem key="Housing_Units_that_are_Rentals_(2015)">
          Housing Units that are Rentals (2015)
        </DropdownItem>
        <DropdownItem key="Housing_Units_that_are_Income_Restricted_(2021)">
          Housing Units that are Income Restricted (2021)
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}