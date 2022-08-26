import React from "react";
import styled from "styled-components";
import SideMainAsideLayout from "../../layouts/SideMainAsideLayout";
import Feeds from "./feed/Feeds";
import Profile from "./profile/Profile";
import Recommendation from "./recommendation/Recommendation";

export default function FeedPage() {
  return (
    <SideMainAsideLayout>
      <Profile />
      <Feeds />
      <Recommendation />
    </SideMainAsideLayout>
  );
}
