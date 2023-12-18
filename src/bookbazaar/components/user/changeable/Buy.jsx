import { useEffect, useState } from "react";
import Popup from "../../Popup";
import { buyBook, buyBooksFromCart, getBookByIsbn, getBuyItemsFromCart } from "../../api/UsersApiService";
import { useAuth } from "../../security/AuthContext";
import { Link, useParams } from "react-router-dom";

const Buy = () => {

    const {isbn} = useParams();
    const [order, setOrder] = useState(null);
    const [popup, setPopup] = useState(null);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const auth = useAuth();

    useEffect(() => {

        console.log("Isbn is : ", isbn)
        if (isbn) {
            let book = null;
            getBookByIsbn(isbn)
                .then(response => {
                    book = response.data;
                    console.log("Response data :", response)
                    const orderItem = { book: book, quantity: 1, totalCost: book.price };
                    const orderItems = [];
                    orderItems.push(orderItem);
                    setOrder({ cartItems: orderItems, totalCost: book.price });
                })
                .catch(error => {
                    setPopup({ type: "error", message: error.response.data.message })
                });

        } else {
            getBuyItemsFromCart(auth.user.id)
                .then(response => {
                    setOrder(response.data)
                })
                .catch(error => {
                    setPopup({ type: "error", message: error.response.data.message })
                });
        }

    }, [])

    function showErrorOnBuy(error) {

        if(error.response.data.message == "Address Not Available") {
            setPopup({type: "error", message: "User Address not available. Please provide Address."})
        } else {
            setPopup({type: "error", message: "Error while order books"})
        }
    }

    function buy() {
        if(isbn) {
            buyBook(auth.user.id, isbn)
            .then(response => {
                if(response.status === 202) {
                    setPopup({type: "success", message: "Order Successfully Placed"})
                    setIsOrderPlaced(true);
                }
            })
            .catch(error => {
                showErrorOnBuy(error)
            })
        } else {
            buyBooksFromCart(auth.user.id)
            .then(response => {
                if(response.status === 202) {
                    setPopup({type: "success", message: "Order Successfully Placed"})
                    setIsOrderPlaced(true);
                }
            })
            .catch(error => {
                showErrorOnBuy(error);
            })
        }
    }

    return (
        <div className="Buy">
            {popup && <Popup popupData={popup} />}
            {order &&
                <div className="invoice">
                    <h1>Checkout Orders</h1>
                    <table className="items-holder">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="book-name">{item.book.bookName}</td>
                                        {/* <td className="book-price">${(item.book.price * item.quantity).toFixed(2)}</td> */}
                                        <td className="book-price">${item.totalCost}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td>${order.totalCost.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    { !isOrderPlaced && <button className="btn btn-red" onClick={buy}>Buy Books</button> }
                    { isOrderPlaced && <Link className="btn btn-red" to="/orders">View Orders</Link> }
                </div>
            }
        </div>
    );
}

export default Buy;