import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const BookDetailsPage = () => {
    const {bookName} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
        } catch(error){
            console.log("Error in fetchBookDetails:", error)
        }
    };

    return (
        <div className="container">

            {isLoading ? (
                <div>Loading...</div>
            ) : (
            <div>
                <h1>{bookDetail.volumeInfo?.title} Details!</h1>
                <h3> Title: {bookDetail.volumeInfo?.title} </h3>
                {bookDetail.volumeInfo?.imageLinks?.smallThumbnail && (
                <img 
                    src={bookDetail.volumeInfo?.imageLinks?.smallThumbnail}
                    alt={`${bookDetail.volumeInfo?.title} cover`}
                />
                )}
            </div>
            )}
        </div>
    );
};

export default BookDetailsPage;