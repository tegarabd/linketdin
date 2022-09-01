import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Content from "../../components/utilities/Content";
import MainSideLayout from "../../layouts/MainSideLayout";
import NotFound from "../error/NotFound";
import CreateThread from "./CreateThread";
import Messages from "./Messages";
import Threads from "./Threads";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MessagingPane = styled(Content)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1rem;
  min-height: 50rem;
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
              element={<Messages />}
            />
            <Route
              path="/thread/:threadId"
              element={<Messages />}
            />
            <Route
              path="/thread/new"
              element={<CreateThread />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </MessagingPane>
      </Wrapper>
      <Footer />
    </MainSideLayout>
  );
}

export default MessagingPage;
