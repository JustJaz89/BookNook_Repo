import React from 'react';

const ResultsList = ({searchResults}) => {
    console.log(searchResults);
    return (
        <div className="resultsList">
            <h2>This is the results list!</h2>
            {searchResults.map((books, index) => (
                <div key={index}>
                    <h3>{books.book.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default ResultsList;