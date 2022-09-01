import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Content from "../../components/utilities/Content";
import Line from "../../components/utilities/Line";
import SideMainAsideLayout from "../../layouts/SideMainAsideLayout";
import Notifications from "./Notifications";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function NotificationsPage() {
  return (
    <SideMainAsideLayout>
      <Wrapper>
        <Content padding="1rem">
          <h3>Notifications</h3>
          <p>You have new notifications</p>
        </Content>
      </Wrapper>
      <Wrapper>
        <Notifications />
      </Wrapper>
      <Wrapper>
        <Footer />
      </Wrapper>
    </SideMainAsideLayout>
  );
}

export default NotificationsPage;
