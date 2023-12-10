import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookByIsbn } from './../../api/BooksApiService';
import Rating from "./subcomponents/Rating";
import ErrorComponent from "./subcomponents/ErrorComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const ViewBook = () => {

    const { searchQuery } = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        // getBookByIsbn(1, searchQuery)
        //     .then(response => response.json())
        //     .then(data => setBookInfo(data))
        //     .catch(error => {
        //         console.log("Error while reading book information", error);
        //     });
        setBookInfo(getBookByIsbn(1, searchQuery))
    }, [searchQuery]);

    function buyBook() {

    }

    return (
        <div className="ViewBook">
            {
                console.log("ViewBook render")
            }
            <h1>Book Details</h1>

            {errorMsg && <ErrorComponent msg={errorMsg} />}
            {!errorMsg && bookInfo &&
                <div className="book-details-holder">
                    <div className="book-image">
                        <Favourite inFavourite={bookInfo.inFavourite} isbn={bookInfo.book.isbn}/>
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
                        <button className="btn btn-red" onClick={() => buyBook(bookInfo.book.isbn)}>Buy Book</button>
                        <ButtonAddToCart inCart={bookInfo.inCart} isbn={bookInfo.book.isbn} />
                    </div>
                </div>
            }
        </div>
    );

}

export default ViewBook;



const Favourite = ({inFavourite, isbn}) => {

    const [isInFavourite, setIsInFavourite] = useState(inFavourite);

    function addToFavourite() {
        setIsInFavourite(!isInFavourite);
    }

    return (
        <div className="heart-icon-holder" onClick={addToFavourite}>
            {
                isInFavourite ? <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} className="heart-icon" /> : <FontAwesomeIcon icon={faHeartBorder} className="heart-icon" />
            }
        </div>
    )
}



const ButtonAddToCart = ({inCart, isbn}) => {

    const [cartButtonClass, setCartButtonClass] = useState('btn btn-orange btn-m');

    const [isInCart, setIsInCart] = useState(inCart);

    function addToCart() {
        setIsInCart(!isInCart);
        if (isInCart)
            setCartButtonClass('btn btn-orange');
        else
            setCartButtonClass('btn btn-orange btn-disabled');
    }

    return(
        <button className={cartButtonClass} onClick={addToCart} disabled={isInCart}>{isInCart ? "Added to Cart" : "Add to Cart"}</button>
    )

}