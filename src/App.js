import './App.css';
import React from 'react';


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

class Photo extends React.Component{
    render() {
        return(
            <img src={this.props.thumbnailUrl}/>
        );
    }
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



class Main extends React.Component{
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

function App() {
  return (
        <main className={"App-main"}>
            <header>Photo Albums Page</header>
            {/*<header className="App-header">*/}
            {/*    Photo Albums Page*/}
            {/*</header>*/}
            <Main />

            {/*<div className={"Album-div"}>*/}
            {/*    <Album id={2} title={"quidem molestiae enim"}/>*/}
            {/*</div>*/}

        </main>

  );
}

export default App;
