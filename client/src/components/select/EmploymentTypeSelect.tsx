import React, { ChangeEventHandler } from "react";
import Select from "../form/Select";

function EmploymentTypeSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <Select
      id={id}
      onChange={onChange}
      value={value}
    >
      <option value="">Select one</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Self-employed">Self-employed</option>
      <option value="Freelance">Freelance</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Apprenticeship">Apprenticeship</option>
      <option value="Seasonal">Seasonal</option>
    </Select>
  );
}

export default EmploymentTypeSelect;
