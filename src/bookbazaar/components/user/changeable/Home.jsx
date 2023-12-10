import { useEffect, useState } from "react";
import Banner from "./../../../assets/banner.jpg";
import { getAllBooks } from "../../api/BooksApiService";
import BooksCategoryHolder from "./subcomponents/BooksCategoryHolder";

const Home = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        // getAllBooks()
        //     .then(response => {
        //         setBooks(response.data);
        //     })
        //     .catch(error => {
        //         console.log("Error while retrieve data in Home.jsx", error);
        //     })

    setBooks(getAllBooks);
    }, []);


    return (
        <div className="Home">
            <div className="banner">
                <img src={Banner} alt="Books banner" />
            </div>
            <BooksCategoryHolder category={"Popular Books"} bookList={books} />
        </div>
    );
}

export default Home;