import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/UsersApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../security/AuthContext";
import EmptyComponent from "../../EmptyComponent";
import emptyOrderImage from "../../../assets/empty-order.webp";

const Order = () => {

    const [orders, setOrders] = useState(null);
    const auth = useAuth();
    const emptyImage = <img src={emptyOrderImage} />

    useEffect(() => {

        getAllOrders(auth.user.id)
            .then(response => {
                setOrders(response.data)
                console.log(JSON.stringify(response.data))
            })
            .catch(error => console.log("Error : ", error));

    }, [])

    return (
        <div className="Orders">
            {orders && orders.length > 0 ? <h1>Your Orders <FontAwesomeIcon icon={faCartPlus} /> </h1> : (<></>)}
            {
                orders && orders.length == 0 ?
                    (
                        <EmptyComponent image={emptyImage} message="No orders yet" redirectLink="/home" redirectMessage="Continue Shopping" />
                    ) :
                    (
                        <div className="order-holder">
                            {
                                orders &&
                                orders.map((order, index) => (
                                    <div className="table-holder" key={index}>
                                        <div className="table-header">
                                            <div className="order-id">order id : #{order.id}</div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Book Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.orderItems.map((item, index2) => (
                                                        <tr key={index2}>
                                                            <td><img src={item.book.imageUrl} alt="" /></td>
                                                            <td className="td-book-name">{item.book.bookName}</td>
                                                            <td>{item.book.price ? `$${item.book.price}` : "NA"}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>${item.totalCost.toFixed(2)}</td>
                                                            {/* <td><button className="btn btn-red btn-s" onClick={() => removeFromCart(item.book.isbn)}>Remove</button></td> */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <div className="table-footer">
                                            <div>Total Items : {order.orderItems.length}</div>
                                            <div>Total Cost : ${order.totalcost.toFixed(2)}</div>
                                            <div>Ordered Date : {order.orderedDate}</div>
                                            <div>Delivery Date : {order.deliveredDate? order.deliveredDate : "Yet to Deliver"}</div>
                                        </div>
                                    </div>
                                ))

                            }
                        </div>
                    )
            }
        </div>
    );
}

export default Order;