import React, { useContext } from "react";
import './CreateCodebookModal.scss';
import { ModalContext } from "../ModalProvider";
import { CodebookContext } from "../CodebookProvider";

export const CreateCodebookModal = () => {
  const modalFeatures = useContext(ModalContext);
  const CodebookFeatures = useContext(CodebookContext);

  const closeModal =()=>{
    modalFeatures.closeModal();
  }

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;
    CodebookFeatures.createNewCodebook({
        folderName,
        fileName,
        language
    });
    closeModal()
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">close</span>
        <h1>Create New Codebook</h1>
        <div className="item">
          <p>Enter Folder Name</p>
          <input name="folderName" placeholder="Folder Name"  required/>
        </div>
        <div className="item">
          <p>Enter card name</p>
          <input name="fileName" placeholder="File Name"  required/>
        </div>
        <div className="item">
          <select name="language" required>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <button type="submit">Create Codebook</button>
        </div>
      </form>
    </div>
  );
};
