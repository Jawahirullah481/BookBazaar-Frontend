import { useEffect, useRef, useState } from "react";
import { getAllOrders, getAllUsers } from "../../api/AdminApiService";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDetails } from "../../api/UsersApiService";


const AdminOrders = () => {

    const [orders, setOrders] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [activeOrder, setActiveOrder] = useState(null);

    useEffect(() => {
        setOrders(getAllOrders);
    }, [])

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    function showOrderItems(event, obj) {
        setActiveOrder(obj);
    }

    return (
        <div className="AdminOrders">
            {activeOrder && <OrderItem order={activeOrder} setOrder={setActiveOrder} />}
            <div className="page-title">Orders</div>
            {orders &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Order ID" />
                            <button className="btn btn-orange btn-search">Search</button>
                        </div>
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Book Name" />
                            <button className="btn btn-orange btn-search">Search</button>
                        </div>
                    </div>
                    <table>
                        <thead className={tHeadClass}>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Order Status</th>
                                <th>View Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index1) => (
                                    <tr key={index1}>
                                        <td>{order.id}</td>
                                        <td>{order.user.id}</td>
                                        <td>{order.orderedDate}</td>
                                        <td>{order.totalcost.toFixed(2)}</td>
                                        <td>
                                            {order.orderStatus === 'ORDERED' && (
                                                <button className="btn btn-red">Ship Order</button>
                                            )}
                                            {order.orderStatus === 'SHIPPED' && (
                                                <button className="btn btn-blue">Deliver Order</button>
                                            )}
                                            {order.orderStatus === 'DELIVERED' && <p>Delivered</p>}
                                        </td>
                                        <td><button className="btn btn-grey" onClick={(event) => showOrderItems(event, order)}>view</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="table-footer-holder">
                        <div className="table-footer">
                            <button className="btn-nav">Previous</button>
                            <button className="btn-nav">Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default AdminOrders;

const OrderItem = ({ order, setOrder }) => {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        setUserDetails(getUserDetails)
    }, [])

    return (
        <div className="OrderItem">

            <div className="content">
                <h1>Order Items</h1>
                <div className="user-details-holder">
                    <h3>Order ID : {order.id}</h3>
                    <div className="order-table-holder">
                    <table className="table-order-items">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.orderItems.map((orderItem, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{orderItem.book.id}</td>
                                        <td>{orderItem.book.bookName}</td>
                                        <td>{orderItem.quantity}</td>
                                        <td>{orderItem.book.price}</td>
                                        <td>{orderItem.totalCost.toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    {userDetails &&
                        <div className="user-details">
                            <h4>User Address</h4>
                            <p>{userDetails.username},</p>
                            <p>{userDetails.address.address}, {userDetails.address.city}, {userDetails.address.state}, {userDetails.address.country}, {userDetails.address.landmark},</p>
                            <p>PIN : {userDetails.address.pin} | Mobile No : {userDetails.address.mobile}</p>
                            <p>Mail : {userDetails.email}</p>
                        </div>
                    }
                    <div className="btn-holder">
                        <button className="btn btn-red btn-close" onClick={() => setOrder(null)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}