import './App.css';
import React from 'react';
import Album from './comps/Album';
import AlbumsBook from "./comps/AlbumsBook";



function App() {
  return (
        <main className={"App-main"}>
            <header className="App-header">Photo Albums Page</header>
            {/*<AlbumsBook/>*/}
            <div>
                <Album id={1} title={"quidem molestiae enim"}/>
            </div>
        </main>

  );
}

export default App;
