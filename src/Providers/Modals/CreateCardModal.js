import { useContext } from "react";
import { ModalContext } from '../ModalProvider';
import { v4 as uuidv4 } from 'uuid';
import { CodebookContext } from "../CodebookProvider";
import { defaultCodes } from "../CodebookProvider";
import './CreateCardModal.scss';

export const CreateCardModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { createCodebook } = useContext(CodebookContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;
    const file = {
      id: uuidv4(),
      title: fileName,
      language,
      code: defaultCodes[language]
    };
    createCodebook(modalPayload, file);
    closeModal();
  };

  return (
    <div className="create-codebook-modal">
      <form className="codebook-modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">
          close
        </span>
        <h1>Create New Codebook</h1>
        <div className="codebook-item">
          <input
            className="input"
            name="fileName"
            placeholder="Enter card title"
            required
          />
          <select name="language" required className="selector">
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <button type="submit" className="button">Create Codebook</button>
      </form>
    </div>
  );
};
