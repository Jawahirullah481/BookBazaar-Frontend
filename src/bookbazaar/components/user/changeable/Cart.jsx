import { useEffect, useRef, useState } from "react";
import { getCart } from "../../api/UsersApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {

    const [cartItems, setCartItems] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');

    useEffect(() => {

        // calling api to fetch cartItems

        setCartItems(getCart(1).cartItems);

    }, []);

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    function incrementQuantity(isbn) {

        // Update in back end
        setCartItems(oldValues => {
            return oldValues.map(item => {
                if (item.book.isbn == isbn) {

                    if (!(item.quantity == item.book.stockQuantity)) {
                        item.quantity = item.quantity + 1;
                        item.totalCost = (item.quantity * item.book.price).toFixed(2);
                    }
                }

                return item;
            })
        })

    }

    function decrementQuantity(isbn) {

        // Update in back end
        setCartItems(oldValues => {
            return oldValues.map(item => {
                if (item.book.isbn == isbn) {

                    if (item.quantity != 0) {
                        item.quantity = item.quantity - 1;
                        item.totalCost = (item.quantity * item.book.price).toFixed(2);
                    }
                }

                return item;
            })
        })
    }

    function removeFromCart(isbn) {
        setCartItems(oldValues => {
            return oldValues.filter(item => item.book.isbn != isbn)
        });
    }

    function buyCart() {

    }



    return (
        <div className="Cart">
            <h1>Your Cart <FontAwesomeIcon icon={faCartPlus} /> </h1>
            {
                console.log("cart render")
            }
            <div className="cart-holder">
                {cartItems &&
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
                                    cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td><img src={item.book.imageUrl} alt="" /></td>
                                            <td className="td-book-name">{item.book.bookName}</td>
                                            <td>{item.book.price ? item.book.price : "NA"}</td>
                                            { item.book.stockQuantity == 0 ? <td className="stock-not-available">Stock not available</td> : <td>{item.book.stockQuantity}</td> }
                                            <Quantity isbn={item.book.isbn} stockAvailable={item.book.stockQuantity} cartItemQuantity={item.quantity} />
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
        </div>
    );
}

export default Cart;

const Quantity = ({ isbn, stockAvailable, cartItemQuantity }) => {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(cartItemQuantity);
    }, []);

    function incrementStock() {
        setQuantity(quantity + 1);
    }

    function decrementStock() {
            setQuantity(quantity - 1);
    }

    return (
        <>
            <td>
                <div className="quantity">
                    <button className="increment" onClick={incrementStock}>+</button>
                    <span>{quantity}</span>
                    <button className="decrement" onClick={decrementStock} disabled={quantity == 0}>-</button>
                </div>
            </td>
            <td>
                <button className="btn btn-green" disabled={cartItemQuantity == quantity}>Update</button>
            </td>
        </>
    )
}