import React, { useState } from 'react';

const AddNewReview = (props) => {

    const [text, setText] = useState("");
    const [rating, setRating] = useState("");
    const [user, setUser] = useState("");
    const [book_id, setBook_id] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        let newReview = {
            user: user,
            book_id: book_id,
            rating: rating,
            text: text,

        };
        console.log(newReview);
        props.addNewReviewProperty(newReview);
    };

    return (
        <form onSubmit={handleSubmit} className ="form-grid">
            <div className="form-group">
                <label> User </label>
                <input type="text" className="form-control" id="inputUser" placeholder="User" value={user} onChange={(event) => setUser(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Book ID </label>
                <input type="text" className="form-control" id="inputBook_id" placeholder="Book_id" value={book_id} onChange={(event) => setBook_id(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Rating </label>
                <input type="text" className="form-control" id="inputRating" placeholder="Rating" value={rating} onChange={(event) => setRating(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Text </label>
                <input type="text" className="form-control" id="inputText" placeholder="Text" value={text} onChange={(event) => setText(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{"margin-top": "1em"}}> Add </button>
        </form>
    )
};

export default AddNewReview;