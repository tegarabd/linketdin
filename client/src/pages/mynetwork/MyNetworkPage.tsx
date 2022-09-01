import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Content from "../../components/utilities/Content";
import SideMainLayout from "../../layouts/SideMainLayout";
import ConnectInvitation from "./main/ConnectInvitation";
import UserMightKnow from "./main/UserMightKnow";
import ConnectionCount from "./side/ConnectionCount";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function MyNetworkPage() {
  return (
    <SideMainLayout>
      <Wrapper>
        <ConnectionCount />
        <Footer />
      </Wrapper>
      <Wrapper>
        <ConnectInvitation />
        <UserMightKnow />
      </Wrapper>
    </SideMainLayout>
  );
}

export default MyNetworkPage;
