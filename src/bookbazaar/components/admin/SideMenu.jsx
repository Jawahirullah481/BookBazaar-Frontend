import { faArrowRightFromBracket, faBook, faCubesStacked, faGear, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const SideMenu = () => {

    const auth = useAuth();

    return (
        <div className="SideMenu">
            <div className="logo">BookBazaar.com</div>
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/admin/books" className="nav-link" activeClassName="active">
                            <FontAwesomeIcon icon={faBook} className="sidemenu-icon" />
                            <span>Books</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className="nav-link" activeClassName="active">
                            <FontAwesomeIcon icon={faCubesStacked} className="sidemenu-icon" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className="nav-link" activeClassName="active">
                            <FontAwesomeIcon icon={faUsers} className="sidemenu-icon" />
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/account" className="nav-link" activeClassName="active">
                            <FontAwesomeIcon icon={faGear} className="sidemenu-icon" />
                            <span>Account Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <button className="btn-logout" onClick={auth.logout}><FontAwesomeIcon icon={faArrowRightFromBracket} className="sidemenu-icon"/>Logout</button>
        </div>
    );
}

export default SideMenu;