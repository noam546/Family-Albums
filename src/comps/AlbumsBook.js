import React from 'react';
import './AlbumsBook.css';
import Album from './Album';
import Dropdown from "./Dropdown";

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
        this.setCurrAlbum(this.state.currAlbumId)
    }
    //check if the album already has brought from Json
    //in order to handle the lazy loading
    //if not create it and set the state
    async setCurrAlbum(albumId){
        const map = {...this.state.albums}
        if(!map[albumId]){
            const newAlbum = await this.createAlbum(albumId);
            map[albumId] = newAlbum
            this.setState({albums: map,length : map.length})
        }
    }
    //get the album from Json and return it
    //async in order to wait for the response from Json
    async createAlbum(albumId){
        const album = await getAlbum(albumId)
        return album;
    }
    //in order to handle the situation that the currAlbumId is changing in the
    //and the album has not brought yes from Json
    createAndSetAlbum(albumId){
        this.setCurrAlbum(albumId)
        return (<div className={"Loading-div"}>Loading...</div>)
    }

    render() {
        console.log(this.props.currAlbumId)
        const albums = {...this.state.albums}
        const id = this.props.currAlbumId
        return (<div>
                    <div>there are {this.state.albums? this.state.albums.length : 0} existing albums</div>
                    <Dropdown handleClick={(albumId) => this.props.setAlbum(albumId)}/>
                    <div className={"AlbumsBook-div"}>
                        {albums[id] ? <Album id={id} title={albums[id].title} modalFunc={this.props.modalFunc}/> : this.createAndSetAlbum(id)}
                    </div>
                </div>

        );
    }
}

export default AlbumsBook;