import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import AddNewReview from './ReviewList';
import useAuth from '../../hooks/useAuth';



const BookDetailsPage = () => {
    const {bookName} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    // const currentUserId = {currentUserId}
    const [user, token] = useAuth();
    useEffect(() => {
        fetchBookDetails();
        getAllReviews();
    }, []);

    const fetchBookDetails = async () => {
        try{
            let response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/${bookName}`
                );
        console.log(response.data)
        setBookDetail(response.data);
        setIsLoading(false);
        // setReviews(response.data.reviews);
        // setAverageRating(calculateAverageRating(response.data.reviews));
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

    let favoriteDetails = {
        book_id: bookName,
        title: bookDetail.volumeInfo?.title,
        thumbnail_url: bookDetail.volumeInfo?.imageLinks?.smallThumbnail,
    };

    function favoriteBook(bookName) {
        axios.post(`http://127.0.0.1:5000/api/favorite`, favoriteDetails, {headers: {Authorization: 'Bearer ' + token}})
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

    async function getAllReviews() {
        let response = await axios.get(`http://127.0.0.1:5000/api/${bookName}`, {headers: {Authorization: 'Bearer ' + token}});
        setReviews(response.data);
      }

    async function addNewReview(newReview) {
        let response = await axios.post('http://127.0.0.1:5000/api/review', newReview, {headers: {Authorization: 'Bearer ' + token}});
                if(response.status === 201) {
          await getAllReviews();
        }
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
                <AddNewReview addNewReviewProperty={addNewReview} bookName={bookName}/>
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