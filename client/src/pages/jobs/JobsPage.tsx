import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Content from "../../components/utilities/Content";
import SideMainAsideLayout from "../../layouts/SideMainAsideLayout";
import CreateJob from "./CreateJob";
import Jobs from "./Jobs";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function JobsPage() {
  return (
    <SideMainAsideLayout>
      <Wrapper>
        <Content padding="1rem">
          <h3>Jobs</h3>
        </Content>
        <CreateJob />
      </Wrapper>
      <Wrapper>
        <Jobs />
      </Wrapper>
      <Wrapper>
        <Content padding="1rem">
          <h3>Job seeker guidance</h3>
          <p>Recommended based on your activity</p>
        </Content>
        <Footer />
      </Wrapper>
    </SideMainAsideLayout>
  );
}

export default JobsPage;
