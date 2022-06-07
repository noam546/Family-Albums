import React from 'react';
import '../App.css';


class Photo extends React.Component{
    render() {
        return(<div onClick  className={"Photo-div"}>
                <header className={"img-header"}><img className={"App-img"} src={this.props.thumbnailUrl}/></header>
                <h3>{this.props.title}</h3>
                <h5 className={"id"}>id:{this.props.id}</h5>
                <div className={"url-div"}>{this.props.url}</div>
            </div>

        );
    }
}

export default Photo;