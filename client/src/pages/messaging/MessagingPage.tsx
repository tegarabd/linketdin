import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Content from "../../components/utilities/Content";
import MainSideLayout from "../../layouts/MainSideLayout";
import NotFound from "../error/NotFound";
import Threads from "./Threads";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MessagingPane = styled(Content)`
  flex-direction: row;
`;

function MessagingPage() {
  return (
    <MainSideLayout>
      <Wrapper>
        <MessagingPane>
          <Threads />
          <Routes>
            <Route
              path="/"
              element={<div>No selected thread</div>}
            />
            <Route
              path="/thread/:threadId"
              element={<div>Selected thread</div>}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </MessagingPane>
      </Wrapper>
    </MainSideLayout>
  );
}

export default MessagingPage;
