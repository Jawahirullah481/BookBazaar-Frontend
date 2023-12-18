import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from "./changeable/subcomponents/AppContext";

const HeaderComponent = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [headerClass, setHeaderClass] = useState('view');
    const auth = useAuth();
    const isLoggedIn = auth.isLoggedIn;
    const classes = `HeaderComponent ${headerClass}`;
    const appContext = useAppContext();
    const navigate = useNavigate();

    let oldScrollY = window.scrollY;

    const listenScrollEvent = (event) => {

        if (window.scrollY < 35) {
            setHeaderClass("view")
        } else if (oldScrollY > window.scrollY) {
            setHeaderClass("view")
        }
        else {
            setHeaderClass("hide")
        }

        oldScrollY = window.scrollY;
    }

    function searchBook() {
        appContext.setSearchQuery(searchQuery);
        navigate("/home");
    }

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);


    return (
        <div className={classes}>
            <div className="logo">
                BookBazaar
            </div>
            <div className="search-bar">
                <input type="text" placeholder="search books here.." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                <div className="search-icon-holder" onClick={searchBook}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <NavLink to={"/home"} className={"link-item"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Home</NavLink>
                    </li>
                    {isLoggedIn && <li>
                        <NavLink to={"/cart"} className={"link-item"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Cart</NavLink>
                    </li>}
                    {isLoggedIn && <li>
                        <NavLink to={"/favourites"} className={"link-item"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Favourites</NavLink>
                    </li>}
                    {isLoggedIn && <li>
                        <NavLink to={"/orders"} className={"link-item"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Orders</NavLink>
                    </li>}
                    {isLoggedIn && <li>
                        <NavLink to={"/profile"} className={"link-item"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Profile</NavLink>
                    </li>}
                    {/* {isLoggedIn && <li className="btn-link">
                        <NavLink to={"/"} className={"link-item btn-white"}>Log out</NavLink>
                    </li>} */}
                    {isLoggedIn && <li className="btn-link">
                        <button  className={"btn link-item btn-white"} onClick={auth.logout}>Log out</button>
                    </li>}
                    {(!isLoggedIn) && <li>
                        <NavLink className={"link-item"} to={"/login"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Log in</NavLink>
                    </li>}
                    {(!isLoggedIn) && <li className="btn-link">
                        <NavLink to={"/signup"} className={"link-item btn-white"} style={({ isActive }) => ({
                            borderBottom: isActive ? "1.5px solid rgb(255, 255, 255)" : "none"
                        })}>Sign up</NavLink>
                    </li>}

                </ul>
            </div>
        </div>
    );
}

export default HeaderComponent;