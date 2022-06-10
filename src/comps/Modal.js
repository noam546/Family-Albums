import React from 'react';
import './Modal.css';

function Modal({closeModal,currAlbum,photo}){
    return(
          <div className="modalBackground">
            <div className="modalContainer">
                <div className="ModalCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                    <img className={"ModalImg"} src={photo.url}/>
                <div className={"ModalTitle"}>
                    "{photo.title}"
                </div>
                <div className={"ModalAlbum"}>
                    from album {currAlbum.id}
                </div>
                <div className={"ModalPhotoId"}>
                    photo id: {photo.id}
                </div>
            </div>
          </div>
    )
}

export default Modal;


// <div>
//     <img className={"Modal-img"} src={photo.url}/>
// </div>