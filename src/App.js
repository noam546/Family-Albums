import './App.css';
import './comps/Dropdown.css'
import React, {useState} from 'react';
import AlbumsBook from "./comps/AlbumsBook";
import Modal from "./comps/Modal";

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function App() {

    /*
    handle the modal of the photos
    when photo is clicked a modal will open up
    currAlbumId is using to render the last album that
    was rendered before the modal was opened
    */
    const [openModal,setOpenModal] = useState(false);
    const [photo,setPhoto] = useState({id:null,title:null,url:null})
    const [currAlbumId,setAlbum] = useState(1)
    function setModalPhoto(photo){
        setOpenModal(true)
        setPhoto(photo)
    }
  return (
        <main className={"App-main"}>
            <body className={"App-main"}>
                {openModal && <Modal closeModal={setOpenModal} photo={photo}/>}
                Photo Albums Page
                {!openModal && <AlbumsBook currAlbumId={currAlbumId} setAlbum={setAlbum} modalFunc={setModalPhoto}/>}
            </body>
        </main>
  );
}

export default App;
