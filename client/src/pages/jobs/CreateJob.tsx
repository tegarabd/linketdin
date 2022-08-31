import ButtonSecondary from "../../components/utilities/button/ButtonSecondary";
import Content from "../../components/utilities/Content";
import { ReactComponent as AddIcon } from "../../assets/plus-icon.svg";
import { useState } from "react";
import CreateJobModal from "./CreateJobModal";

function CreateJob() {
  const [modalOpened, setModalOpened] = useState(false);
  const openModal = () => {
    setModalOpened(true);
  };
  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    <Content padding="1rem">
      <h3>Create Job</h3>
      <ButtonSecondary onClick={openModal}>
        <AddIcon /> Create
      </ButtonSecondary>
      {modalOpened && <CreateJobModal onClose={closeModal} />}
    </Content>
  );
}

export default CreateJob;
