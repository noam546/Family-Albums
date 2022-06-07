import React from 'react';
import '../App.css';
import Album from './Album';

function getAlbum(albumId){
    return fetch('https://jsonplaceholder.typicode.com/albums?id='+albumId)
        .then((response) =>
        {
            if(response.ok){
                return response.json()
            }
            throw 'something went wrong.'
        })
        .then((json) => new Album({id: json[0].id,title: json[0].title}))
        .catch((reason) => console.warn(reason));
}


class AlbumsBook extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            albums: new Map(),
            currAlbum: null,
            currAlbumId: 1,
            length: 0
        }
        const promise = this.setCurrAlbum(this.state.currAlbumId)
        // promise.then((value) => console.log("this.state : ")).catch((reason)=> console.log("reason : "+reason))
    }

    async setCurrAlbum(albumId){
        const map = this.state.albums
        console.log("in set curr")
        if(map.has(albumId)){
            console.log("has in map")
            const album = map.get(albumId);
            this.setState({currAlbum: album,currAlbumId: albumId})
        }
        else{
            console.log("first time");
            const newAlbum = await this.createAlbum(albumId);
            map.set(albumId,newAlbum);
            this.setState({albumsMap: map,currAlbum: newAlbum,currAlbumId: albumId,length : map.size})
        }
    }

    async createAlbum(albumId){
        const album = await getAlbum(albumId)
        return album;
    }

    render() {
        // console.log("currAlbum : "+(this.state.currAlbum ? "true "+this.state.currAlbum : "false "+this.state.currAlbum))
        return (
            <div>
                {this.state.currAlbum ? this.state.currAlbum.render() : <div>Waiting...</div>}
            </div>
        );
    }
}

export default AlbumsBook;