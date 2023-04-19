import React, { useState } from "react";
import axios from "axios";

function SearchPage() {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search:
          <input type="text" value={searchString} onChange={handleSearchChange} />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;