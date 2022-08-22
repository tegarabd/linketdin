import React from "react";
import styled from "styled-components";
import { ReactComponent as Icon } from "../../assets/search-icon.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  left: 0.5rem;
  height: 1.2rem;
  width: 1.2rem;
  fill: ${(props) => props.theme.font};
`;

const Input = styled.input`
  height: 2rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.primary};
  padding: 1rem;
  padding-left: 2.5rem;
  width: 15rem;
  transition: 300ms;

  &:focus {
    width: 20rem;
  }
`;

function SearchBar() {
  return (
    <Wrapper>
      <SearchIcon />
      <Input type="search" placeholder="Search" />
    </Wrapper>
  );
}

export default SearchBar;
