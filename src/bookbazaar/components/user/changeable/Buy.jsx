import { useEffect, useState } from "react";

const Buy = () => {


    const [order, setOrder] = useState(null);

    useEffect(() => {
        setOrder({
            items: [
                {
                    bookName: "Rich Dad Poor Dad",
                    totalCost: 234
                },
                {
                    bookName: "The Art of Learning",
                    totalCost: 123
                },
                {
                    bookName: "Chess Master",
                    totalCost: 3440
                },
                {
                    bookName: "How to Make money",
                    totalCost: 340
                },
                {
                    bookName: "Java The Completer Refrence",
                    totalCost: 564
                }
            ],
            totalCost: 4874
        })
    }, [])

    function buy() {
        
    }

    return (
        <div className="Buy">
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
                                order.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="book-name">{item.bookName}</td>
                                        <td className="book-price">${item.totalCost}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                <td>${order.totalCost}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <button className="btn btn-red" onClick={buy}>Buy Books</button>
                </div>
            }
        </div>
    );
}

export default Buy;