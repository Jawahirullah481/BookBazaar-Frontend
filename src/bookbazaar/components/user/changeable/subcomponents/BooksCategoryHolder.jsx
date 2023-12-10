import BookCard from "./BookCard";

const BooksCategoryHolder = ({ category, bookList }) => {

    return (
        <div className="BooksCategoryHolder">
            <h2>{category}</h2>
            <div className="books-holder">
                {bookList.map((book, index) => (
                    <BookCard key={index} book={book} />
                ))}
            </div>

        </div>
    );
}

export default BooksCategoryHolder;