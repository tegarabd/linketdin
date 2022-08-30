import React, { ChangeEventHandler } from "react";
import Select from "../form/Select";

function MonthSelect({
  id,
  value,
  onChange,
  disabled
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}) {
  return (
    <Select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">Month</option>
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </Select>
  );
}

export default MonthSelect;
