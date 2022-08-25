import styled from "styled-components";
import { User } from "../../types/user";

const Wrapper = styled.div`
  & > p {
    font-size: 0.9rem;
    line-height: 1.2;
  }
  & > h4 {
    font-weight: 600;
  }
`;

function ProfileNameHeadline({ user }: { user: User | any }) {
  return (
    <Wrapper>
      <h4>{`${user.firstName || ""} ${user.lastName || ""} ${
        user.additionalName || ""
      }`}</h4>
      <p>{user.headline}</p>
    </Wrapper>
  );
}

export default ProfileNameHeadline;
