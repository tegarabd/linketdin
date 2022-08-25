import React, { FC, InputHTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element;
}

interface LabelProps {
  disabled?: boolean;
}

const Label = styled.label<LabelProps>`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 50%;
  transition: 300ms;
  color: ${(props) => (props.disabled ? props.theme.shadow : props.theme.font)};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.theme.secondary : props.theme.shadow};
  }
`;

const InputWithIcon: FC<InputWithIconProps> = ({
  id,
  type,
  accept,
  icon,
  disabled,
  onChange,
}) => {
  return (
    <>
      <Label htmlFor={id} disabled={disabled}>
        {icon}
      </Label>
      <input
        id={id}
        type={type}
        accept={accept}
        hidden
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default InputWithIcon;
