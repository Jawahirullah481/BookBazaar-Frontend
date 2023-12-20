import { useEffect, useRef, useState } from "react";
import { getAllOrders, getOrderById, getOrderItems, getOrderedUserDetails, getPendingOrders, updateOrderStatus } from "../../api/AdminApiService";
import Popup from "../../Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faRepeat } from "@fortawesome/free-solid-svg-icons";


const AdminOrders = () => {

    const [orders, setOrders] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [popup, setPopup] = useState(null);
    const [searchOrderId, setSearchOrderId] = useState(null);
    const [ordersType, setOrdersType] = useState("All Orders");
    const page = -1;

    useEffect(() => {
        getAllOrders(page)
            .then(response => {
                setOrders(response.data)
            })
            .catch(error => {
                setPopup({ type: "error", message: "Error while getting orders" })
            })

    }, [])

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    function showOrderItems(event, orderid, userid) {
        setOrderDetails({ orderid: orderid, userid: userid })
    }

    /* --------- Searching -------------- */

    function handleOnSearchOrderIdChange(event) {
        const value = event.target.value;
        if (!isNaN(value)) {
            setSearchOrderId(value);
        }
    }

    function searchOrderById() {

        if (searchOrderId == null) {
            return;
        }

        if (searchOrderId.length == 0 && (orders.length > 1)) {
            return;
        }

        if (searchOrderId) {
            getOrderById(searchOrderId)
                .then(response => {
                    setOrders([response.data]);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log("Error while gettin order")
                    setPopup({ type: "error", message: "No Order Available" })
                })
        } else {
            getAllOrders(page)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    setPopup({ type: "error", message: "Error while getting orders" })
                })
        }
    }

    function changeOrderType() {
        if(ordersType == "All Orders") {
            setOrdersType("Pending Orders")
            getPendingOrders(page)
            .then(response => setOrders(response.data))
            .catch(error => setPopup("Error while getting orders"))
        } else {
            setOrdersType("All Orders")
            getAllOrders(page)
            .then(response => setOrders(response.data))
            .catch(error => setPopup("Error while getting orders"))
        }
    }


    return (
        <div className="AdminOrders">
            {popup && <Popup popupData={popup} />}
            {orderDetails && <OrderItem orderDetails={orderDetails} setOrder={setOrderDetails} />}
            <div className="page-title">Orders</div>
            {orders &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Order ID" value={searchOrderId} onChange={(event) => handleOnSearchOrderIdChange(event)} />
                            <button className="btn btn-orange btn-search" onClick={searchOrderById}>Search</button>
                        </div>
                        <button className="btn-filter" onClick={changeOrderType}>{ordersType}<FontAwesomeIcon icon={faRepeat} className="filter-icon" /></button>
                    </div>
                    <table>
                        <thead className={tHeadClass}>
                            <tr>
                                <th>User ID</th>
                                <th>Order ID</th>
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
                                        <td>{order.user.id}</td>
                                        <td>{order.id}</td>
                                        <td>{order.orderedDate}</td>
                                        <td>{order.totalcost.toFixed(2)}</td>
                                        <OrderStatus orderInfo={{ orderid: order.id, orderStatus: order.orderStatus }} setPopup={setPopup} />
                                        <td><button className="btn btn-grey" onClick={(event) => showOrderItems(event, order.id, order.user.id)}>view</button></td>
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



const OrderStatus = ({ orderInfo, setPopup }) => {

    const [orderStatus, setOrderStatus] = useState(null);

    useEffect(() => {
        setOrderStatus(orderInfo.orderStatus)
    }, [orderInfo.orderid]);

    function updateOrder(status) {
        updateOrderStatus(orderInfo.orderid, status)
            .then(response => {
                if (status == 2) {
                    setOrderStatus("SHIPPED");
                } else {
                    setOrderStatus("DELIVERED");
                }
            })
        .catch(error => setPopup({type: "error", message: "Error while updating order status"}));
    }

    return (
        <>
            <td>
                {orderStatus === 'ORDERED' && (
                    <button className="btn btn-red btn-status" onClick={() => updateOrder(2)}>Ship Order</button>
                )}
                {orderStatus === 'SHIPPED' && (
                    <button className="btn btn-blue btn-status" onClick={() => updateOrder(3)}>Deliver Order</button>
                )}
                {orderStatus === 'DELIVERED' && <p>Delivered</p>}
            </td>
        </>
    )

}


const OrderItem = ({ orderDetails, setOrder }) => {

    const [userDetails, setUserDetails] = useState(null);
    const [orderItems, setOrderItems] = useState(null);

    useEffect(() => {

        getOrderItems(orderDetails.orderid)
            .then(response => {
                setOrderItems(response.data)
            })
            .catch(error => {
                console.log("Error while getting order Items", error);
            });

        getOrderedUserDetails(orderDetails.userid)
            .then(response => {
                console.log("User details is : ", response.data)
                setUserDetails(response.data)
            })
            .catch(error => {
                console.log("Error while getting user information", error);
            })
    }, [])

    return (
        <div className="OrderItem">

            {orderItems &&
                <div className="content">
                    <h1>Order Items</h1>
                    <div className="user-details-holder">
                        <h3>Order ID : {orderDetails.orderid}</h3>
                        <div className="order-table-holder">
                            <table className="table-order-items">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>ISBN</th>
                                        <th>Book Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderItems.map((orderItem, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{orderItem.book.isbn}</td>
                                                <td>{orderItem.book.bookName}</td>
                                                <td>{orderItem.book.price}</td>
                                                <td>{orderItem.quantity}</td>
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
            }
        </div>
    )
}