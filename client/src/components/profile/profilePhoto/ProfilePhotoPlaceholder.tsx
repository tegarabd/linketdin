import styled from "styled-components";
import { UserProfile } from "../../header/profile";

interface Props {
  size?: string
}

const Wrapper = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => (props.size === "large" ? "1.2rem" : "0.8rem")};
  text-align: center;
  border-radius: 50%;
  width: ${(props) => (props.size === "large" ? "3rem" : "1.6rem")};
  height: ${(props) => (props.size === "large" ? "3rem" : "1.6rem")};
  color: ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.accent};
`;

function PhotoPhotoPlaceholder({
  user,
  size,
}: {
  user: UserProfile;
  size?: string;
}) {
  return (
    <Wrapper
      size={size}
    >{`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}</Wrapper>
  );
}

export default PhotoPhotoPlaceholder;
