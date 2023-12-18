import { useEffect, useRef, useState } from "react";
import Banner from "./../../../assets/banner.jpg";
import { getPopularBooks, searchBook } from "../../api/BooksApiService";
import BooksCategoryHolder from "./subcomponents/BooksCategoryHolder";
import { useAppContext } from "./subcomponents/AppContext";
import Popup from "../../Popup";

const Home = () => {

    const [books, setBooks] = useState(null);
    const appContext = useAppContext();
    let searchQuery = null;
    const [popup, setPopup] = useState(null);


    useEffect(() => {

        searchQuery = appContext.searchQuery;

        if (searchQuery) {
            searchBook(searchQuery)
                .then(response => setBooks(response.data))
                .catch(error => console.log("Error : ", error));
        } else {
            getPopularBooks()
                .then(response => setBooks(response.data))
                .catch((error) => console.log("Error : ", error));
        }

    }, [appContext.searchQuery]);


    return (
        <div className="Home">
           {popup && <Popup popupData={popup} /> }
            <div className="banner">
                <img src={Banner} alt="Books banner" />
            </div>
            {books &&
                <BooksCategoryHolder category={"Popular Books"} bookList={books} />
            }
        </div>
    );
}

export default Home;