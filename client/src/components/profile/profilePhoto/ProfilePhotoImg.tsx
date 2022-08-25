import React from "react";
import styled from "styled-components";

interface Props {
  size?: string;
}

const Img = styled.img<Props>`
  border-radius: 50%;
  width: ${(props) => (props.size === "large" ? "3rem" : "1.6rem")};
  height: ${(props) => (props.size === "large" ? "3rem" : "1.6rem")};
  object-fit: cover;
`;

function ProfilePhotoImg({ src, size }: { src: string; size: string }) {
  return <Img src={src} size={size} />;
}

export default ProfilePhotoImg;
