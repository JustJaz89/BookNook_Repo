import React, { useState } from 'react';
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import axios from "axios"

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    const fetchBooks = async () => {
        try {
            let lowerCaseSearchTerm = searchTerm.toLowerCase();
            let response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${lowerCaseSearchTerm}`
            );
            console.log(response.data)
            setSearchResults(response.data.items);
        } catch (error) {}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchBooks();
        alert(`You searched for ${searchTerm}!`);
    };

    return (
        <div className="container search">
            <h1> Search Page! </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSubmit={handleSubmit}

            />
            <ResultsList searchResults={searchResults} />
        </div>
    );
};

export default SearchPage;