import React, { useContext } from "react";
import "./index.scss";
import logo from './logo12.png';
import { CodebookContext } from "../../../Providers/CodebookProvider";
import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(CodebookContext);
  const { openModal, setModalPayload } = useContext(ModalContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    deleteFolder(folderId);
  };

  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };

  const openCreateCardModal = () => {
    setModalPayload(folderId);
    openModal(modalConstants.CREATE_CARD);
  };

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons" style={{ color: "#FFAC29" }}>folder</span>
          <span>{folderTitle}</span>
        </div>
        <div className="folder-header-item">
          <span className="material-icons delete-folder" onClick={onDeleteFolder}>delete</span>
          <span className="material-icons" onClick={onEditFolderTitle}>edit</span>
          <button onClick={openCreateCardModal}>
            <span className="material-icons">add</span>
            <span>New Codebook</span>
          </button>
        </div>
      </div>
      <div className="cards-container">
        {cards?.map((file) => {
          const onEditFile = (event) => {
            event.stopPropagation(); // Prevent navigation
            setModalPayload({ fileId: file.id, folderId: folderId });
            openModal(modalConstants.UPDATE_FILE_TITLE);
          };

          const onDeleteFile = (event) => {
            event.stopPropagation(); // Prevent navigation
            deleteFile(folderId, file.id);
          };

          const navigateToCodebookScreen = () => {
            navigate(`/codebook/${file.id}/${folderId}`);
          };

          return (
            <div className="card" key={file.id} onClick={navigateToCodebookScreen}>
              <img src={logo} alt="File Logo" />
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language: {file?.language}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span className="material-icons" onClick={onDeleteFile}>delete</span>
                <span className="material-icons" onClick={onEditFile}>edit</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export const RightComponent = () => {
  const { folders } = useContext(CodebookContext);
  const { openModal } = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <div className="title"><span>My</span> Codebook</div>
        <button className="add-folder" onClick={openCreateNewFolderModal}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {Array.isArray(folders) && folders.map((folder) => (
        <Folder folderTitle={folder?.title} cards={folder?.files} key={folder.id} folderId={folder.id} />
      ))}
    </div>
  );
};
