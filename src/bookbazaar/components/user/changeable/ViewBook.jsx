import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookByIsbn } from './../../api/BooksApiService';
import Rating from "./subcomponents/Rating";
import ErrorComponent from "./subcomponents/ErrorComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../security/AuthContext";
import { addBookToCart, addBookToFavourite, getUserBookByIsbn, removeBookFromFavourite } from "../../api/UsersApiService";
import Popup from "../../Popup";


const ViewBook = () => {

    const { isbn } = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const auth = useAuth();
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    

    function addToFavourite() {
        if (!auth.isLoggedIn) {
            navigate("/login", { state: { path: `/view-book/${isbn}` } });
            return;
        }

        // Create a copy of the current state
        let bookInfoTemp = { ...bookInfo, inFavourite: !bookInfo.inFavourite };

        // Update the state with the new bookInfo
        setBookInfo(bookInfoTemp);

        // Make the API call based on the updated state
        const apiCall = bookInfo.inFavourite
            ? removeBookFromFavourite(auth.user.id, bookInfo.book.isbn)
            : addBookToFavourite(auth.user.id, bookInfo.book.isbn);

        // Perform the API call
        apiCall
            .then((response) => {
                if (response.status === 200) {
                    setPopup({
                        type: "success",
                        message: bookInfo.inFavourite
                            ? "Book removed from Favourite"
                            : "Book added to Favourite",
                    });
                } else {
                    setPopup({
                        type: "error",
                        message: bookInfo.inFavourite
                            ? "Denied to remove from Favourite"
                            : "Denied to add to Favourite",
                    });

                    // Revert the state if the API call fails
                    bookInfoTemp = { ...bookInfo, inFavourite: !bookInfo.inFavourite };
                    setBookInfo(bookInfoTemp);
                }
            })
            .catch((error) => {
                console.error("Error in API call:", error);
            });
    }


    function addToCart() {

        if (!auth.isLoggedIn) {
            navigate("/login", { state: { path: `/view-book/${isbn}` } });
            return;
        }

        // Create a copy of the current state
        let bookInfoTemp = { ...bookInfo, inCart: true };

        // Update the state with the new bookInfo
        setBookInfo(bookInfoTemp);

        // Make the API call based on the updated state
        const apiCall = addBookToCart(auth.user.id, bookInfo.book.isbn)

        // Perform the API call
        apiCall
            .then((response) => {
                if (response.status === 200) {
                    setPopup({
                        type: "success",
                        message: "Book Added to cart"
                    });
                } else {
                    setPopup({
                        type: "error",
                        message: "Error while remove book from Favourite"
                    });

                    // Revert the state if the API call fails
                    bookInfoTemp = { ...bookInfo, inCart: false };
                    setBookInfo(bookInfoTemp);
                }
            })
            .catch((error) => {
                console.error("Error in API call:", error);
            });

    }


    function buyBook(isbn) {
        navigate(`/buy/${isbn}`);
    }


    useEffect(() => {

        console.log("Use Effect is running")

        if (auth.isLoggedIn) {
            getUserBookByIsbn(auth.user.id, isbn)
                .then(response => setBookInfo(response.data))
                .catch(error => console.log("Error", error));
        } else {
            getBookByIsbn(isbn)
                .then(response => setBookInfo(response.data))
                .catch(error => console.log("Error", error));
        }

    }, [isbn, auth.user]);

    return (
        <div className="ViewBook">
            {popup && <Popup popupData={popup} />}
            <h1>Book Details</h1>

            {errorMsg && <ErrorComponent msg={errorMsg} />}
            {bookInfo &&
                <div className="book-details-holder">
                    <div className="book-image">
                        <div className="heart-icon-holder" onClick={addToFavourite}>
                            {bookInfo.inFavourite ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} className="heart-icon" /> : <FontAwesomeIcon icon={faHeartBorder} className="heart-icon" />}
                        </div>
                        <img src={bookInfo.book.imageUrl} alt="" />
                    </div>
                    <div className="book-details">
                        <h2>{bookInfo.book.bookName}</h2>
                        <p className="author">{bookInfo.book.authors.toString()}</p>
                        <p className="description">{bookInfo.book.description}</p>
                        <h3 className="book-price">
                            <span className="rupee-symbol">₹</span>
                            {bookInfo.book.price ? Math.abs(bookInfo.book.price) : "NA"}
                        </h3>
                        <Rating rating={bookInfo.book.rating} />
                        <p className="stock">{bookInfo.stock ? (bookInfo.stock + " stocks left") : "Stock Not Available"}</p>
                        <button className="btn btn-red" onClick={() => buyBook(bookInfo.book.isbn)} disabled={bookInfo.stock == 0}>Buy Book</button>
                        <button className="btn btn-orange" onClick={addToCart} disabled={bookInfo.inCart}>{bookInfo.inCart ? "Added to Cart" : "Add to Cart"}</button>
                    </div>
                </div>
            }
        </div>
    );

}

export default ViewBook;