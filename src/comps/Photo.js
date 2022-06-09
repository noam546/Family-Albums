import React, {useState} from 'react';
import './Photo.css';
import Modal from "./Modal";

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.modalContainer')) {
        var modals = document.getElementsByClassName("modalContainer");
        var i;
        for (i = 0; i < modals.length; i++) {
            var openDropdown = modals[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function Photo({id , title , url , thumbnailUrl,modalFunc}){

    return(<div onClick={() => {modalFunc({id:id , title:title , url:url});}} className={"Photo-div"}>
                <header className={"img-header"}><img className={"App-img"} src={thumbnailUrl}/></header>
                <div className={"title"}>
                    <p>{title}</p>
                </div>
                <div className={"id"}>
                    <footer>id:{id}</footer>
                </div>
                <div className={"url-div"}>
                    {url}
                </div>
            </div>

        );

}

export default Photo;