import React from "react";
import ButtonTertiary from "../../../../components/utilities/button/ButtonTertiary";
import { ReactComponent as SendIcon } from "../../../../assets/send-icon.svg";

function SendButton() {
  return (
    <ButtonTertiary>
      <SendIcon /> Send
    </ButtonTertiary>
  );
}

export default SendButton;
