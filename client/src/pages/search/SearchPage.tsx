import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import ButtonPrimary from "../../components/utilities/button/ButtonPrimary";
import ButtonSecondary from "../../components/utilities/button/ButtonSecondary";
import MainSideLayout from "../../layouts/MainSideLayout";
import PostResult from "./PostResult";
import UserResult from "./UserResult";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

function SearchPage() {
  const { type } = useParams();

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
    case "user":
      result = <UserResult />;
      break;
  }

  return (
    <MainSideLayout>
      <Wrapper>
        <FilterWrapper>
          <ButtonPrimary>All</ButtonPrimary>
          <ButtonSecondary>People</ButtonSecondary>
          <ButtonSecondary>Post</ButtonSecondary>
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
