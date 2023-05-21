import React, {useEffect, useState} from "react";
import Card from "./card";
import './App.css';
import ReactDOM from "react-dom";
import albums from './Album.json';
import SearchForm from "./SearchForm";

const App = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState([]);
    const updateSearchResults = (phrase) => {
        console.log('phrase is ', phrase);
        setSearchPhrase(phrase);
    }
    useEffect(() => {
        setAlbumList(albums);
    },[albumList]);
    const renderedList = () => {

        return albumList.map((album) => {
            if (album.description.toLowerCase().includes(searchPhrase.toLowerCase()) || searchPhrase === '')
            return (
                <Card
                    key = {album.id}
                    albumTitle={album.title}
                    albumDescription={album.description}
                    buttonText='OK'
                    imgURL={album.image}/>);
            else
                console.log('Does not match ' + searchPhrase);
        });
    };
    return <div><div className='container'><SearchForm onSubmit={updateSearchResults}/></div> <div className='container'>{renderedList()}</div></div>;
}
export default App;