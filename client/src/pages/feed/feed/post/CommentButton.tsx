import React from "react";
import ButtonTertiary from "../../../../components/utilities/button/ButtonTertiary";
import { ReactComponent as CommentIcon } from "../../../../assets/comment-icon.svg";

function CommentButton({onClick}:{onClick: VoidFunction}) {
  return (
    <ButtonTertiary onClick={onClick} >
      <CommentIcon /> Comment
    </ButtonTertiary>
  );
}

export default CommentButton;
