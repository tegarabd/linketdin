import styled from "styled-components";
import { User } from "../../types/user";

interface Props {
  size?: string;
  align?: string;
}

const Wrapper = styled.div<Props>`
  text-align: ${props => props.align === "center" ? "center" : "left"};
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
  align,
}: {
  user: User | any;
  withHeadline?: boolean;
  withPronouns?: boolean;
  size?: string;
  align?: string;
}) {
  return (
    <Wrapper size={size} align={align}>
      <h4>
        {`${user.firstName || ""} ${user.lastName || ""} ${
          user.additionalName || ""
        }`}
        {withPronouns && <span>{user.pronouns && `(${user.pronouns})`}</span>}
      </h4>
      {withHeadline && (
        <div>
          {user.headline
            .split("#")
            .filter((headline: string) => headline !== "")
            .map((headline: string, index: number) => (
              <p key={index}>{headline}</p>
            ))}
        </div>
      )}
    </Wrapper>
  );
}

export default ProfileName;
