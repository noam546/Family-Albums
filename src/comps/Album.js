import React from 'react';
import '../App.css';
import Photo from './Photo';

function getPhotos(albumId){
    return fetch('https://jsonplaceholder.typicode.com/albums/'+albumId+'/photos')
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            throw 'something went wrong.'
        })
        .then((json) => json.map((photo)=>
            new Photo({
                id:photo.id,
                title: photo.title,
                url: photo.url,
                thumbnailUrl: photo.thumbnailUrl
            })))
        .catch((reason)=> console.warn(reason));
}

class Album extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            photos: null,
        }
        const promise = this.createPhotos(this.props.id)
        // promise.then((value) => console.log("value : "+value)).catch((reason)=> console.log("reason : "+reason))
    }
    render() {
        console.log("Photos : "+(this.state.photos ? "true "+this.state.photos : "false "+this.state.photos))
        return (this.state.photos? this.state.photos.map((photo)=>
            photo.render()) : <div>Loading...</div>)
    }
    //get photos array from json and set the state
    async createPhotos(albumId){
        const photos = await getPhotos(albumId);
        console.log("photos from JSON : "+photos)
        console.log("in create photo , state = "+this.state.photos)
        this.setState({photos: photos})
        console.log("in create photo after setState , state = "+this.state.photos)
    }
}

export default Album;