import React from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import ButtonPrimary from "../../components/utilities/button/ButtonPrimary";
import ButtonSecondary from "../../components/utilities/button/ButtonSecondary";
import Content from "../../components/utilities/Content";
import MainSideLayout from "../../layouts/MainSideLayout";
import PostResult from "./PostResult";
import UserResult from "./UserResult";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FilterWrapper = styled(Content)`
  flex-direction: row;
`;

function Button({ children }: { children: JSX.Element | string }) {
  const [searchParams] = useSearchParams();
  const { type } = useParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";

  const handleClick = () => {
    navigate({
      pathname: `/search/results/${children.toString().toLowerCase()}`,
      search: createSearchParams({
        query,
      }).toString(),
    });
  };

  if (children.toString().toLowerCase() === type) {
    return <ButtonPrimary onClick={handleClick}>{children}</ButtonPrimary>;
  }

  return <ButtonSecondary onClick={handleClick}>{children}</ButtonSecondary>;
}

function SearchPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  let result;
  switch (type) {
    case "all":
      result = (
        <>
          <UserResult />
          <PostResult />
        </>
      );
      break;
    case "post":
      result = <PostResult />;
      break;
    case "people":
      result = <UserResult />;
      break;
  }

  return (
    <MainSideLayout>
      <Wrapper>
        <FilterWrapper>
          <Button>All</Button>
          <Button>People</Button>
          <Button>Post</Button>
        </FilterWrapper>
        {result}
      </Wrapper>
      <Wrapper>
        <Footer />
      </Wrapper>
    </MainSideLayout>
  );
}

export default SearchPage;
