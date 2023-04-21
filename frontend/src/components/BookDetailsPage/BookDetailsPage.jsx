import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const BookDetailsPage = () => {
    const {bookName} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    // const currentUserId = {currentUserId}

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const fetchBookDetails = async () => {
        try{
            let response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/${bookName}`
                );
        console.log(response.data)
        setBookDetail(response.data);
        setIsLoading(false);
        setReviews(response.data.reviews);
        setAverageRating(calculateAverageRating(response.data.reviews));
        setIsFavorite(response.data.favorite);
        // setIsFavorite(response.data.favorite.includes(currentUserId));
        } catch(error){
            console.log("Error in fetchBookDetails:", error)
        }
    };

    function calculateAverageRating(reviews) {
        const totalRating = reviews.reduce((acc, curr) => acc + curr.score, 0);
        return reviews.length > 0 ? Math.round(totalRating / reviews.length) : 0;
    }

    function favoriteBook(bookName) {
        axios.post(`http://127.0.0.1:5000/api/review`, {bookName})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    function handleFavoriteClick() {
        favoriteBook(bookName);
    }

    return (
        <div className="container">

            {isLoading ? (
                <div>Loading...</div>
            ) : (
            <div>
                <h1>{bookDetail.volumeInfo?.title}</h1>
                <h2>Book Details</h2>
                <br></br>
                <h3> Title: {bookDetail.volumeInfo?.title} </h3>
                {bookDetail.volumeInfo?.imageLinks?.smallThumbnail && (
                <img 
                    src={bookDetail.volumeInfo?.imageLinks?.smallThumbnail}
                    alt={`${bookDetail.volumeInfo?.title} cover`}
                />
                )}
                <h3> Author: {bookDetail.volumeInfo?.authors}</h3>
                <br></br>
                <h5> Description: {bookDetail.volumeInfo?.description}</h5>
                <br></br>
                <h3>Reviews</h3>
                <p>Average Rating: {averageRating}</p>
                <button onClick={handleFavoriteClick}>Favorite This Book</button>
                <p>Favorite: {isFavorite ? 'Yes' : 'No'}</p>
                {/* <ul>
                    {bookDetail.reviews.map(review => (
                    <li key={review.id}>
                        <p>User: {review.user}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                    </li>
                    ))}
                </ul> */}
            </div>
            )}
        </div>
    );
};

export default BookDetailsPage;