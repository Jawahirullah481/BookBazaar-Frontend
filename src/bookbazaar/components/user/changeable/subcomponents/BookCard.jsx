import Rating from "./Rating";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {

    return (
        <div className="book-card">
            <div className="book-image-holder">
                <img src={book.imageUrl} alt={""} />
            </div>
            <Rating rating={book.rating} />
            <h1 className="book-title">{book.bookName}</h1>
            <p className="author">{book.authors?.toString()}</p>
            <div className="book-price">
                <p>
                    <span className="rupee-symbol">₹</span>
                    {book.price ? Math.abs(book.price) : "NA"}
                </p>
            </div>
            <Link to={`/view-book/${book.isbn}`} className="btn btn-black">View Book</Link>
        </div>
    );
}

export default BookCard;