import React, { ChangeEventHandler } from "react";
import Select from "../form/Select";

function YearSelect({
  id,
  value,
  onChange,
  disabled,
  min,
  max,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  min: number;
  max: number;
}) {
  const options = [];

  for (let i = max; i >= min; i--) {
    options.push(
      <option
        key={i}
        value={i.toString()}
      >
        {i}
      </option>
    );
  }

  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="0">Year</option>
      {options}
    </Select>
  );
}

export default YearSelect;
