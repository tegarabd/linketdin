import styled from "styled-components";
import { User } from "../../types/user";

interface Props {
  size?: string;
}

const Wrapper = styled.div<Props>`
  & > h4 {
    font-size: ${(props) => (props.size === "large" ? "1.8rem" : "")};
    font-weight: 600;

    & > span {
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
  & > p {
    font-size: ${(props) => (props.size === "large" ? "1rem" : "0.9rem")};
    line-height: 1.2;
  }
`;

function ProfileName({
  user,
  withHeadline,
  withPronouns,
  size,
}: {
  user: User | any;
  withHeadline?: boolean;
  withPronouns?: boolean;
  size?: string;
}) {
  return (
    <Wrapper size={size}>
      <h4>
        {`${user.firstName || ""} ${user.lastName || ""} ${
          user.additionalName || ""
        }`}
        {withPronouns && <span>{user.pronouns}</span>}
      </h4>
      {withHeadline && <p>{user.headline}</p>}
    </Wrapper>
  );
}

export default ProfileName;
