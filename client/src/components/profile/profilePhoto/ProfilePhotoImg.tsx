import React from "react";
import styled from "styled-components";

interface Props {
  size?: string;
}

const Img = styled.img<Props>`
  border-radius: 50%;
  border: ${(props) =>
    props.size === "extra-large"
      ? `0.25rem solid ${props.theme.secondary}`
      : "none"};
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
  object-fit: cover;
`;

function ProfilePhotoImg({ src, size }: { src: string; size: string }) {
  return <Img src={src} size={size} referrerPolicy="no-referrer" />;
}

export default ProfilePhotoImg;
