import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Card from "./card";
import './App.css';
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
import datasource from "./dataSource";
import SearchAlbum from "./SearchAlbum";
import navBar from "./NavBar";
import NavBar from "./NavBar";
import OneAlbum from "./OneAlbum";
import NewAlbum from "./NewAlbum";

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState([]);
    const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
    let refresh = false;

    const loadAlbums = async () => {
        const response = await datasource.get('/albums');
        setAlbumList(response.data);
    };



    useEffect(() => {
        loadAlbums();
    }, [refresh]);

    const updateSearchResults = (phrase) => {
        console.log('phrase is ', phrase);
        setSearchPhrase(phrase);
    }
    const updateSingleAlbum = (id, navigate) => {
        console.log('Update Single Album ', id);
        console.log('Update Single Album ', navigate);
        var indexNumber = 0;
        for (var i=0; i < albumList.length; i++) {
            if (albumList[i].id === id) indexNumber = i;
        }
        setCurrentlySelectedAlbumId(indexNumber);
        console.log('update path', '/show/' + indexNumber);
        navigate('/show/' + indexNumber);
    };

    console.log('albumList', albumList);
    const renderedList = albumList.filter((album) => {
        return album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === '';

    });
    console.log('renderedList ', renderedList);

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <SearchAlbum
                            updateSearchResults={updateSearchResults}
                            albumList={renderedList}
                            updateSingleAlbum={updateSingleAlbum}
                        />
                    }
                />
                <Route exact path='/new' element={<NewAlbum/>}/>
                <Route
                    exact
                    path='/show/:albumId'
                    element={<OneAlbum album={albumList[currentlySelectedAlbumId]}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default App;