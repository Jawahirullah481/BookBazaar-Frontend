import { useEffect, useRef, useState } from "react";
import { getCart, removeBookFromCart, updateCartItemQuantity } from "../../api/UsersApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../security/AuthContext";
import Popup from "../../Popup";
import emptyCartImage from "../../../assets/empty-cart.png";
import EmptyComponent from "../../EmptyComponent";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const [cart, setCart] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [popup, setPopup] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const emptyImage = <img src={emptyCartImage} />

    useEffect(() => {

        getCart(auth.user.id)
            .then(response => setCart(response.data))
            .catch(error => console.log("error executed useEffect", error))

    }, []);

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    const removeFromCart = (isbn) => {

        let removedItem = null;

        setCart((prevCart) => {

            const updatedCartItems = prevCart.cartItems.filter(
                (item) => {
                    if(item.book.isbn == isbn) {
                        removedItem = item;
                        return false;
                    }
                    return true;
                }
            );

            return {
                ...prevCart,
                cartItems: updatedCartItems,
                totalCost: calculateTotalCost(updatedCartItems),
            };
        });


        removeBookFromCart(auth.user.id, isbn)
        .then(response => {
            if(response.status == 200) {
                setPopup({type: "success", message: "Book Removed from cart"})
            } else {
                setPopup({type: "error", message: "Error while removing book from cart"})

                let tempCart = cart;
                let tempCartItems = cart.cartItems;
                tempCartItems.add(removedItem);
                let tempTotalCost = calculateTotalCost(tempCartItems);
                tempCart.cartItems = tempCartItems;
                tempCart.totalCost = tempTotalCost;
                setCart(tempCart);
                
            }
        })

    }


    // Function to calculate total cost based on cart items
    const calculateTotalCost = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.totalCost, 0).toFixed(2);
    };

    function buyCart() {
        navigate("/buy");
    }


    return (
        <div className="Cart">
            {popup && <Popup popupData={popup} />}
            {cart && cart.cartItems.length > 0 ? <h1>Your Cart <FontAwesomeIcon icon={faCartPlus} /> </h1> : (<></>)}
            {
                cart && cart.cartItems.length == 0 ?
                    (
                        <EmptyComponent image={emptyImage} message="Your Cart is empty" redirectLink="/home" redirectMessage="Continue Shopping" />
                    ) :
                    (
                        <div className="cart-holder">
                            {cart && cart.cartItems &&
                                <div className="table-holder sticky" onScroll={handleOnTableScroll} ref={tableHolder}>
                                    <table>
                                        <thead className={tHeadClass}>
                                            <tr>
                                                <th>Image</th>
                                                <th>Book Name</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Quantity</th>
                                                <th>Update</th>
                                                <th>Checkout</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.cartItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td><img src={item.book.imageUrl} alt="" /></td>
                                                        <td className="td-book-name">{item.book.bookName}</td>
                                                        <td>{item.book.price ? item.book.price : "NA"}</td>
                                                        {item.book.stockQuantity == 0 ? <td className="stock-not-available">Stock not available</td> : <td>{item.book.stockQuantity}</td>}
                                                        <Quantity isbn={item.book.isbn} quantity={item.quantity} setPopup={setPopup} />
                                                        <td><button className="btn btn-red" onClick={() => removeFromCart(item.book.isbn)}>Remove</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="table-footer">
                                        <button className="btn btn-buy-cart" onClick={buyCart}>Buy Cart</button>
                                    </div>
                                </div>
                            }
                        </div>
                    )
            }
        </div>
    );
}

export default Cart;

const Quantity = ({ isbn, quantity, setPopup }) => {

    const auth = useAuth();
    const [changeableQuantity, setChangeablQuantity] = useState(0);

    useEffect(() => {
        setChangeablQuantity(quantity);
    }, []);

    function incrementStock() {
        setChangeablQuantity(changeableQuantity + 1);
    }

    function decrementStock() {
        setChangeablQuantity(changeableQuantity - 1);
    }

    function updateQuantity() {
        updateCartItemQuantity(auth.user.id, isbn, changeableQuantity)
            .then(response => {
                if (response.status === 200) {
                    setPopup({ type: "success", message: "Cart Item successfully updated" })
                } else {
                    setPopup({ type: "error", message: "Error while updating cart Item" })
                    setChangeablQuantity(quantity);
                }
            })
    }

    return (
        <>
            <td>
                <div className="quantity">
                    <button className="increment" onClick={incrementStock}>+</button>
                    <span>{changeableQuantity}</span>
                    <button className="decrement" onClick={decrementStock} disabled={changeableQuantity == 1}>-</button>
                </div>
            </td>
            <td>
                <button className="btn btn-green" disabled={changeableQuantity == quantity} onClick={updateQuantity}>Update</button>
            </td>
        </>
    )
}