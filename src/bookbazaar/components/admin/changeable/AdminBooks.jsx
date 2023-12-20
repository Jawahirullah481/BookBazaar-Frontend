import { useEffect, useRef, useState } from "react";
import Popup from "../../Popup";
import { getAllBooks, getBookByIsbn, getBooksCount, updateBookInfo } from "../../api/AdminApiService";

const AdminBooks = () => {

    const [books, setBooks] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [popup, setPopup] = useState(null);
    const [searchBookIsbn, setSearchBookIsbn] = useState(null);
    const page = -1;


    useEffect(() => {

        getAllBooks(page)
            .then(response => {
                setBooks(response.data)
            })
            .catch(error => {
                setPopup({ type: "Error", message: "Error while getting books" });
                console.log("Error message", error);
            })

    }, [])

    /* ----------------- */

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    /* ---------------- Searching ----------------- */

    function handleOnSearchBookIsbnChange(event) {
        const value = event.target.value;
        if (!isNaN(value) && value.length <= 13) {
            setSearchBookIsbn(value);
        }

    }

    function searchBookByIsbn() {

        if (searchBookIsbn == null) {
            return;
        }

        if (searchBookIsbn.length < 13 && searchBookIsbn.length > 0) {
            return;
        }

        if (searchBookIsbn.length == 0 && (books.length > 1)) {
            return;
        }

        if (searchBookIsbn) {
            getBookByIsbn(searchBookIsbn)
                .then(response => {
                    setBooks([response.data]);
                })
                .catch(error => {
                    setPopup({ type: "error", message: "No Book Available" })
                })
        } else {
            getAllBooks(page)
                .then(response => {
                    setBooks(response.data);
                })
                .catch(error => {
                    setPopup({ type: "error", message: "Error while getting books" })
                })
        }
    }


    return (
        <div className="AdminBooks">
            {popup && <Popup popupData={popup} />}
            <div className="page-title">All Books</div>
            {books &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Book ISBN" value={searchBookIsbn} onChange={(event) => handleOnSearchBookIsbnChange(event)} />
                            <button className="btn btn-orange btn-search" onClick={searchBookByIsbn}>Search</button>
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
                                        <Quantity isbn={book.isbn} bookPrice={book.price} stockAvailable={book.stockQuantity} setPopup={setPopup} />
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <div className="table-footer-holder">
                        <div className="table-footer">
                           <button className="btn btn-nav" onClick={getPrevPage} disabled={!prevPageAvailable}>Previous</button>
                           <button className="btn btn-nav" onClick={getNextPage} disabled={!nextPageAvailable}>Next</button>
                        </div>
                    </div> */}
                </div>
            }
        </div>
    );
}

export default AdminBooks;

const Quantity = ({ isbn, bookPrice, stockAvailable, setPopup }) => {

    const [initialQuantity, setInitialQuantity] = useState(0);
    const [initialPrice, setInitialPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0)

    useEffect(() => {
        setInitialQuantity(stockAvailable);
        setInitialPrice(bookPrice);
        setQuantity(stockAvailable);
        setPrice(bookPrice);
    }, [isbn]);

    function incrementStock() {
        setQuantity(quantity + 1);
    }

    function decrementStock() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function handlePriceChange(event) {

        let value = event.target.value;
        if (!isNaN(value)) {
            setPrice(value);
        }

    }

    function updateBookInformation() {
        if (price != 0) {
            updateBookInfo(isbn, price, quantity)
                .then(response => {
                    setPopup({ type: "success", message: "Book updated successfully" });
                    setInitialPrice(price);
                    setInitialQuantity(quantity);
                })
                .catch(error => {
                    setPopup({ type: "error", message: "Error while updating Book Info" })
                })
        } else {
            setPopup({ type: "error", message: "Enter valid Book Price" })
        }
    }

    return (
        <>
            <td>
                <input type="text" value={price} onChange={(event) => handlePriceChange(event)} />
            </td>
            <td>
                <div className="quantity">
                    <button className="increment" onClick={incrementStock}>+</button>
                    <span>{quantity}</span>
                    <button className="decrement" onClick={decrementStock} disabled={quantity == 0}>-</button>
                </div>
            </td>
            <td>
                <button className="btn btn-green" disabled={price == 0 || (initialQuantity == quantity && initialPrice == price)} onClick={updateBookInformation}>Update</button>
            </td>
        </>
    )
}