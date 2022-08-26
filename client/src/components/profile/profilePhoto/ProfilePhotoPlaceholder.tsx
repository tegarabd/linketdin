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
  border: ${(props) =>
    props.size === "extra-large"
      ? `0.25rem solid ${props.theme.secondary}`
      : "none"};
  font-size: ${(props) => {
    switch (props.size) {
      case "extra-large":
        return "5rem";
      case "large":
        return "1.5rem";
      case "small":
        return "0.8rem";
      default:
        return "0.8rem";
    }
  }};
  text-align: center;
  border-radius: 50%;
  width: ${(props) => {
    switch (props.size) {
      case "extra-large":
        return "10rem";
      case "large":
        return "3rem";
      case "small":
        return "1.6rem";
      default:
        return "1.6rem";
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case "extra-large":
        return "10rem";
      case "large":
        return "3rem";
      case "small":
        return "1.6rem";
      default:
        return "1.6rem";
    }
  }};
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
