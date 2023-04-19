import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const BookDetailsPage = () => {
    const {bookName} = useParams();
    const {bookDetails, setBookDetail} = useState({});
    const {isLoading, setIsLoading} = useState(true);

    useEffect(() => {
        fetchBookDetails();
    }, []);
    const fetchBookDetails = async () => {
        try{
            let response = await axios.get(`${bookName}`);
        setBookDetail(response.data);
        setIsLoading(False);
        } catch(error){
            console.log("Error in fetchBookDetails:", error)
        }
    };

    return (
        <div className="container">
            <h1>{bookName} Details!</h1>
            {isLoading ? <div>Loading...</div>: 
            <div>
                <h3></h3>
            </div>}
        </div>
    );
};

export default BookDetailsPage;