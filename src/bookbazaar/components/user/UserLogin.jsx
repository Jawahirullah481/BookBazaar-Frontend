import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import shoppingWebsiteImage from '../../assets/shoppingWebsite.png';
import '../../css/form.css';

const UserLogin = () => {

    const auth = useAuth();

    /*useEffect( ()=> {
        auth.login("sklj", "slkfj");
    }, []);*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    function handleInputChange(event, field) {
        let value = event.target.value;
        switch (field) {
            case "username": setUsername(value); break;
            case "password": setPassword(value); break;
        }
    }

    return (
        <div className="UserLogin">

            <div className="form-holder">

                <div className="side-card">
                    <div className="heading">
                        <h1>BookBazaar.com</h1>
                        <p>"Do Reading"</p>
                    </div>
                    <div className="side-card-image">
                        <img alt="Shopping Website Image" src={shoppingWebsiteImage} />
                    </div>
                </div>

                <div className="form">

                    <div className="heading">
                        <h1>Login here!</h1>
                        <p>Login to continue shopping</p>
                    </div>

                    <div className="form-element-holder">
                    { errorMessage && <div className="error-message">{errorMessage}</div> }

                        <div className="tf-holder">
                            <input type="text" onChange={(event) => handleInputChange(event, "username")} value={username} placeholder="username" />
                            <div className="tf-icon-holder">
                                <FaUser className="tf-icon" />
                            </div>
                        </div>
                        <div className="tf-holder">
                            <input type="password" onChange={(event) => handleInputChange(event, "password")} value={password} placeholder="password" />
                            <div className="tf-icon-holder">
                                <IoMdLock className="tf-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="form-element-holder">
                        <button className="btn w-100 btn-black">Login</button>
                        <Link to={"/signup"} className="btn btn-border w-100">Sign up</Link>
                        <Link to={"/home"} className="redirect-link">Continue Without Login</Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default UserLogin;