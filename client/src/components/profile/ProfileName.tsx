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

function ProfileName({ user, withHeadline }: { user: User | any; withHeadline?: boolean }) {
  return (
    <Wrapper>
      <h4>{`${user.firstName || ""} ${user.lastName || ""} ${
        user.additionalName || ""
      }`}</h4>
      {withHeadline && <p>{user.headline}</p>}
    </Wrapper>
  );
}

export default ProfileName;
