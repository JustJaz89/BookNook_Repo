import React from 'react';
import { Link } from "react-router-dom";

const ResultsList = ({searchResults}) => {
    console.log(searchResults);
    return (
        <div className="resultsList">
            <h2>This is the results list!</h2>
            {searchResults.map((books, index) => (
                <Link key={index} to={`/details/${books.id}`}>
                    <div>
                        <h3>{books.volumeInfo.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ResultsList;