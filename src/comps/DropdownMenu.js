import React from 'react';
import './Dropdown.css';

//get albums from Json PlaceHolder
function getAlbumsIds(){
    return fetch('https://jsonplaceholder.typicode.com/albums/')
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            throw 'something went wrong.'
        })
        .then((json) => json.map((album) => ({id:album.id})))
        .catch((reason)=> console.warn(reason));
}

class DropdownMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            albumsIds: null,
        }
    }
    componentDidMount() {
        this.setAlbumsIds()
    }
    //set the albumsIds state by get request from the Json PlaceHolder
    async setAlbumsIds(){
        const albumsIds = await getAlbumsIds();
        this.setState({albumsIds:albumsIds})
    }
    //handle a click on the drop down menu and show the optional albums
    handleClick() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    render() {
        return (<div className={"dropdown"}>
                    <button onClick={()=>this.handleClick()} className="dropbtn">Select Album</button>
                    <div id={"myDropdown"} className={"dropdown-content"}>
                        {this.state.albumsIds && this.state.albumsIds.map(
                            (album) => <a key={album.id} onClick={()=>this.props.handleClick({id:album.id})} >album {album.id}</a>)}
                    </div>
                </div>)
    }
}

export default DropdownMenu;


