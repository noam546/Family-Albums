import React from 'react';
import './AlbumsBook.css';
import Album from './Album';
import DropdownMenu from "./DropdownMenu";

function getAlbum(albumId){
    return fetch('https://jsonplaceholder.typicode.com/albums?id='+albumId)
        .then((response) =>
        {
            if(response.ok){
                return response.json()
            }
            throw 'something went wrong.'
        })
        .then((json) => ({id: json[0].id,title: json[0].title}))
        .catch((reason) => console.warn(reason));
}

class AlbumsBook extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            albums: {},
            length: 0
        }
    }
    componentDidMount() {
        this.setCurrAlbum(this.props.currAlbumId)
    }
    //check if the album already has brought from Json
    //in order to handle the lazy loading
    //if not create it and set the state
    async setCurrAlbum(albumId){
        const map = {...this.state.albums}
        if(!map[albumId]){
            map[albumId] = await this.createAlbum(albumId)
            this.setState({albums: map,length : map.length})
        }
    }
    //get the album from Json and return it
    //async in order to wait for the response from Json
    async createAlbum(albumId){
        return await getAlbum(albumId);
    }
    //in order to handle the situation that the currAlbumId is changing in the
    //and the album has not brought yes from Json
    // createAndSetAlbum(albumId){
    //     this.setCurrAlbum(albumId)
    //     return (<div className={"Loading-div"}>Loading...</div>)
    // }

    render() {
            return (<div>
                        <DropdownMenu  handleClick={this.props.setAlbum}/>
                        <div className={"AlbumsBook-div"}>
                            {/*{albums[id] ? <Album id={id} title={albums[id].title} modalFunc={this.props.modalFunc}/> : this.createAndSetAlbum(id)}*/}
                            <Album id={this.props.currAlbumId} modalFunc={this.props.modalFunc}/>
                        </div>
                    </div>

            );
    }
}

export default AlbumsBook;