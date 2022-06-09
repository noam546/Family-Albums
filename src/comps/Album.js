import React from 'react';
import '../App.css';
import Photo from './Photo';

//get photo from Json PlaceHolder
function getPhotos(albumId){
    return fetch('https://jsonplaceholder.typicode.com/albums/'+albumId+'/photos')
        .then((response) => {
            if(response.ok){
                return response.json()
            }
            throw 'something went wrong.'
        })
        .then((json) => json.map((photo)=>
            ({
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
    }
    componentDidMount() {
        this.createPhotos(this.props.id)
    }

    //get photos array from json and set the state
    async createPhotos(albumId){
        const photos = await getPhotos(albumId);
        this.setState({photos: photos})
    }

    render() {
        //if the photos have not brought yet from Json showing loading...
        //otherwise, the photos will render
        return (
                this.state.photos ? this.state.photos.map((photo)=>
                        <Photo id={photo.id} title={photo.title} thumbnailUrl={photo.thumbnailUrl} url={photo.url} modalFunc={this.props.modalFunc}/>) :
                    <div className={"Loading-div"}>Loading...</div>
        )
    }

}

export default Album;