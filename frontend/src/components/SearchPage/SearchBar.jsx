import React from 'react';

const SearchBar = ({searchTerm = "", setSearchTerm, handleSubmit}) => {
    return (
        <form onSubmit={(event) => handleSubmit(event)} className="searchForm">
            <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;