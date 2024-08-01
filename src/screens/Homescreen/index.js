
import { useContext } from "react";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss"
import { RightComponent } from "./RightComponent";
import { modalConstants,ModalContext } from "../../Providers/ModalProvider";


const Homescreen = () => {
    const modalFeatures = useContext(ModalContext);

   const openCreateCodebookModal =()=>{
       modalFeatures.openModal(modalConstants.CREATE_CODEBOOK);
   };
    return (

        <div className="home-container">
            <div className="left-container">
                <div className="item-container">
                    <img src="logo.png" alt="homelogo" style={{borderRadius:"50%"}} ></img>
                    <span style={{fontSize:'43px',fontWeight:'bold'}}>CodeTech</span>
                    <span style={{fontSize:'23px',fontWeight:'500',marginBottom:'5px'}}>Code. Compile. Debug.</span>
                    <button onClick ={openCreateCodebookModal}><span className="material-icons">add</span>
                     <span>Create Codebook</span>
                    </button>
                </div>
            </div>

           <RightComponent />
           <Modal/>
        </div>
    )
}

export default Homescreen;