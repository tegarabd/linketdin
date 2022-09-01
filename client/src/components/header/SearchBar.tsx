import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (query === "") return;

    navigate({
      pathname: "/search/results/all/",
      search: createSearchParams({
        query,
      }).toString(),
    });
  };

  return (
    <Wrapper>
      <SearchIcon />
      <form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="Search"
        />
      </form>
    </Wrapper>
  );
}

export default SearchBar;
