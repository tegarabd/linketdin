import styled from "styled-components";
import { UserProfile } from ".";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => (props.typeof === "large" ? "1.2rem" : "0.8rem")};
  text-align: center;
  border-radius: 50%;
  width: ${(props) => (props.typeof === "large" ? "3rem" : "1.6rem")};
  height: ${(props) => (props.typeof === "large" ? "3rem" : "1.6rem")};
  color: ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.accent};
`;

function PhotoPlaceHolder({
  user,
  size,
}: {
  user: UserProfile;
  size?: string;
}) {
  return (
    <Wrapper
      typeof={size}
    >{`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}</Wrapper>
  );
}

export default PhotoPlaceHolder;
