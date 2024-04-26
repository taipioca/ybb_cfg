import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function CheckboxComponent({ values }) {
  return (
    <CheckboxGroup defaultValue={values.map((value) => value.value)}>
      {values.map((value) => (
        <Checkbox key={value.value} value={value.value}>
          {value.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
