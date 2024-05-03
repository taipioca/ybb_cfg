import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function CheckboxComponent({ categories, activeCategories, setActiveCategories }) {
  return (
    <CheckboxGroup value={activeCategories} onValueChange={setActiveCategories}>
      {categories.map((value, index) => (
        <Checkbox key={index} value={value}>
          {value}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
