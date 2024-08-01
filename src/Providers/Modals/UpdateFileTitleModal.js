import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { CodebookContext } from "../CodebookProvider";

export const UpdateFileTitleModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { editFileTitle } = useContext(CodebookContext);

  const onSubmitModal = (e) => {
    e.preventDefault();
    const fileName = e.target.fileName.value;
    editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">
          close
        </span>
        <h1>Update File Title</h1>
        <div style={createFolderStyles.inputContainer}>
          <input
            required
            name="fileName"
            style={createFolderStyles.input}
            placeholder="Enter File Name"
          />
          <button style={createFolderStyles.btn} type="submit">
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
    gap: '10px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
  },
  btn: {
    backgroundColor: 'rgb(105, 85, 218)',
    border: 'none',
    borderRadius: '4px',
    padding: '8px',
    color: '#eceaf4',
    cursor: 'pointer',
  },
};
