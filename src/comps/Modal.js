import React from 'react';
import './Modal.css';

function Modal({closeModal,photo}){
    return(
          <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div>
                    <img className={"ModalImg"} src={photo.url}/>
                </div>
                <div>
                    <h3 className={"ModalTitle"}> title: {photo.title}</h3>
                </div>
            </div>
          </div>
    )
}

export default Modal;


// <div>
//     <img className={"Modal-img"} src={photo.url}/>
// </div>