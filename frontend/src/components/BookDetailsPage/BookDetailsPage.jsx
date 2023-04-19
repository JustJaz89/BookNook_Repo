import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const BookDetailsPage = () => {
    const {bookName} = useParams();
    const {bookDetails, setBookDetail} = useState({});

    useEffect(() => {
        fetchBookDetails();
    }, []);
    const fetchBookDetails = async () => {
        try{
            let response = await axios.get(`${bookName}`);
        console.log(response.data);
        } catch(error){
            console.log("Error in fetchBookDetails:", error)
        }
    };
    
    return (
        <div className="container">
            <h1>{bookName} Details!</h1>
        </div>
    );
};

export default BookDetailsPage;