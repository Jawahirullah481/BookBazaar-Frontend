import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./changeable/Home";
import SearchBook from "./changeable/SearchBook";
import ViewBook from "./changeable/ViewBook";
import Cart from "./changeable/Cart";
import Order from "./changeable/Order";
import Favourite from "./changeable/Favourite";
import Buy from "./changeable/Buy";
import ErrorPage from "./changeable/ErrorPage";
import Authentication from "../security/Authentication";
import Profile from "./changeable/Profile";


const UserContent = () => {
    return (
        <div className="UserContent">
            <Routes>
                <Route path="/" element={<Navigate to="home" />}></Route>
                <Route path="home" element={<Home />}></Route>
                <Route path="search/:searchQuery" element={<SearchBook />}></Route>
                <Route path="view-book/:isbn" element={<ViewBook />}></Route>
                <Route element={<Authentication authorization={["USER", "ADMIN"]} />}>
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="orders" element={<Order />}></Route>
                    <Route path="favourites" element={<Favourite />}></Route>
                    <Route path="profile" element={<Profile />}></Route>
                    <Route path="buy/:isbn?" element={<Buy />}></Route>
                </Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </div>
    );
}

export default UserContent;