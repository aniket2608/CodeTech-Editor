import { useContext } from "react";
import { ModalContext, modalConstants } from "../ModalProvider";
import { CreateCodebookModal } from "./CreateCodebookModal";
import { CreateFolderModal } from "./CreateFolderModal";
import { UpdateFolderTitleModal } from "./UpdateFolderTitleModal";
import { UpdateFileTitleModal } from "./UpdateFileTitleModal";
import { CreateCardModal } from "./CreateCardModal";

export const Modal = () => {
  const modalFeatures = useContext(ModalContext);
  return ( 
    <>
      {modalFeatures.activeModal === modalConstants.CREATE_CODEBOOK && <CreateCodebookModal />}
      {modalFeatures.activeModal === modalConstants.CREATE_FOLDER && <CreateFolderModal />}
      {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE&& <UpdateFolderTitleModal />}
      {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE&& <UpdateFileTitleModal />}
      {modalFeatures.activeModal === modalConstants.CREATE_CARD&& <CreateCardModal />}
    </>
  );
};
