import React, { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { CodebookContext } from "../CodebookProvider";



export const UpdateFolderTitleModal = () => {
  const { closeModal,modalPayload } = useContext(ModalContext);
  const { editFolderTitle } = useContext(CodebookContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    editFolderTitle(folderName,modalPayload);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">
          close
        </span>
        <h1>Update Folder Title</h1>
        <div style={createFolderStyles.inputContainer}>
          <input
            required
            name="folderName"
            style={createFolderStyles.input}
            placeholder="Enter Folder Name"
          />
          <button
            style={createFolderStyles.btn}
            type="submit"
          >
            Update Title
          </button>
        </div>
      </form>
    </div>
  );
};

const createFolderStyles = {
    inputContainer: {
      display: 'flex',
      gap: 10,
    },
    input: {
      flexGrow: 1,
      padding: 10,
    },
    btn: {
      backgroundColor: 'rgb(105, 85, 218)',
      border: 'none',
      borderRadius: 4,
      padding: '8px',
      color:'#eceaf4',
    },
  };