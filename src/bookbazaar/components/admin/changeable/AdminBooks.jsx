import { useEffect, useRef, useState } from "react";
import { getAllBooks } from "../../api/BooksApiService";

const AdminBooks = () => {

    const [books, setBooks] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');

    useEffect(() => {
        setBooks(getAllBooks);
    }, [])

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    function updateQuantity() {

    }

    return (
        <div className="AdminBooks">
            <div className="page-title">All Books</div>
            {books &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Book ID" />
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
                                <th>Book ISBN</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Update Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.isbn}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.price}</td>
                                        <Quantity isbn={book.isbn} stockAvailable={book.stockQuantity} />
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

export default AdminBooks;

const Quantity = ({ isbn, stockAvailable }) => {

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(stockAvailable);
        console.log(quantity)
    }, []);

    function incrementStock() {
        setQuantity(quantity + 1);
        console.log("Quantity = ", quantity)
    }

    function decrementStock() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
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
                <button className="btn btn-green" disabled={stockAvailable == quantity}>Update</button>
            </td>
        </>
    )
}