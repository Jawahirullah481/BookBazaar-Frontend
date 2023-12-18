import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import shoppingWebsiteImage from '../../assets/shoppingWebsite.png';
import '../../css/form.css';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signupuser } from "../api/UsersApiService";
import { useAuth } from "../security/AuthContext";

const UserSignup = () => {

    const auth = useAuth();
    const location = useLocation();  
    const navigate = useNavigate();  

    useEffect(()=> { 
        if(auth.isLoggedIn) {
            navigate("/home");
        }
    }, [auth.isLoggedIn]);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleInputChange(event, field) {
        let value = event.target.value;
        switch (field) {
            case "username": setUsername(value); break;
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
        }
    }

    function handleSubmit() {

        if(validateForm()) {
            signupuser(username, email, password)
            .then(response => {
                if(response.status === 200) {
                    auth.login(response.data, password);
                    navigate(location.state?.path || "/home");
                }
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            })
        }

    }

    function validateForm() {
        if (username == '') {
            setErrorMessage("Username cannot be empty");
            return false;
        }

        if(username.length < 3) {
            setErrorMessage("Username must contain atleast 3 characters");
            return false;
        }

        if (email == '') {
            setErrorMessage("Email cannot by empty");
            return false;
        }

        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            setErrorMessage("Enter valid Email");
            return false;
        }

        if (password == '') {
            setErrorMessage("Password cannot by empty");
            return false;
        }

        if(password.length < 5) {
            setErrorMessage("Password must contain atleast 5 characters");
            return false;
        }

        return true;
    }


    return (
        <div className="UserSignup">

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
                        <h1>Sign up here!</h1>
                        <p>Sign up to continue shopping</p>
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
                            <input type="email" onChange={(event) => handleInputChange(event, "email")} value={email} placeholder="email" />
                            <div className="tf-icon-holder">
                                <MdEmail className="tf-icon" />
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
                        <button className="btn w-100 btn-black" onClick={handleSubmit}>Sign up</button>
                        <Link to={"/login"} className="btn btn-border w-100">Log in</Link>
                        <Link to={"/home"} className="redirect-link">Continue Without Signup</Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default UserSignup;