import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { CodebookContext } from "../CodebookProvider";

export const CreateFolderModal = () => {
  const modalFeatures = useContext(ModalContext);
  const { createNewFolder } = useContext(CodebookContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const folderName = e.target.folderName.value;
    createNewFolder(folderName);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">close</span>
        <h1>Create New Folder</h1>
        <div style={styles.inputContainer}>
          <input
            name="folderName"
            style={styles.input}
            placeholder="Enter Folder Name"
            required
          />
          <button style={styles.btn} type="submit">Create Folder</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
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
    color: '#eceaf4',
  },
};
