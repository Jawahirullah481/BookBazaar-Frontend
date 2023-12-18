import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Rating from "./subcomponents/Rating";
import { getAllFavourites, removeBookFromFavourite } from "../../api/UsersApiService";
import { useAuth } from "../../security/AuthContext";
import Popup from "../../Popup";
import emptyFavouriteImage from "../../../assets/empty-favourite.png";
import EmptyComponent from "../../EmptyComponent";

const Favourite = () => {

    const [favouriteItems, setFavouriteItems] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [popup, setPopup] = useState(null);
    const auth = useAuth();
    const emptyImage = <img src={emptyFavouriteImage} />

    useEffect(() => {

        console.log("User id in Favourite is : " + auth.user.id);

        getAllFavourites(auth.user.id)
            .then(response => {
                setFavouriteItems(response.data);
            })
            .catch(error => {
                console.log("Error while retrieving favourites")
            })

    }, []);

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    function removeFromFavourite(isbn) {
        // Call api and remove book from favourite

        let removedItem = null;

        setFavouriteItems(items => {
            return items.filter(item => {
                if (item.isbn == isbn) {
                    removedItem = item;
                    return false;
                }
                return true;
            });
        });

        removeBookFromFavourite(auth.user.id, isbn)
            .then(response => {
                if (response.status === 200) {
                    setPopup({ type: "success", message: "Book removed from Favourite" });
                } else {
                    setPopup({ type: "error", message: "Error while removing book from Favourite" });

                    // Revert the state if the API call fails
                    const items = favouriteItems;
                    items.add(removedItem);
                    setFavouriteItems(items);
                }
            })
    }


    return (
        <div className="Favourite">
            {popup && <Popup popupData={popup} />}
            {favouriteItems?.length > 0 ? <h1>Favorites <FontAwesomeIcon icon={faHeart} /> </h1> : (<></>) }
            {
                favouriteItems?.length == 0 ?
                    (
                        <EmptyComponent image={emptyImage} message="Your Favourites is empty" redirectLink="/home" redirectMessage="Continue Shopping" />
                    ) :
                    (
                        <div className="favourite-holder">
                            {favouriteItems &&
                                <div className="table-holder sticky" onScroll={handleOnTableScroll} ref={tableHolder}>
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
                    )
            }
        </div>
    );

}

export default Favourite;