import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { getAllBooks } from "../../api/BooksApiService";
import Rating from "./subcomponents/Rating";

const Favourite = () => {

    const [favouriteItems, setFavouriteItems] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');

    useEffect(() => {

        setFavouriteItems(getAllBooks);

    }, []);

    function handleOnTableScroll(event) {
        if(tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        }else {
            setTHeadClass("")
        }
    }

    function removeFromFavourite(isbn) {
        // Call api and remove book from favourite

        setFavouriteItems(oldValues => {
            return oldValues.filter(item => item.isbn != isbn)
        });

    }

    return (
        <div className="Favourite">
            <h1>Favorites <FontAwesomeIcon icon={faHeart} /> </h1>
            {
                console.log("favourite render")
            }
            <div className="favourite-holder">
                {favouriteItems &&
                    <div className="table-holder sticky"  onScroll={handleOnTableScroll} ref={tableHolder}>
                        <table>
                            <thead className={tHeadClass}>
                                <tr>
                                    <th>Image</th>
                                    <th>Book Name</th>
                                    <th>Price</th>
                                    <th>Rating</th>
                                    <th>Stock</th>
                                    <th>Checkout</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    favouriteItems.map((book, index) => (
                                        <tr key={index}>
                                            <td><img src={book.imageUrl} alt="" /></td>
                                            <td>{book.bookName}</td>
                                            <td>{book.price ? book.price : "NA"}</td>
                                            <td><Rating rating={book.rating} /></td>
                                            <td>{book.stockQuantity}</td>
                                            <td><button className="btn btn-red btn-s" onClick={() => removeFromFavourite(book.isbn)}>Remove</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
}

export default Favourite;