import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import '../../css/form.css';
import '../../css/general.css';
import '../../css/admin.css';
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/UsersApiService";

const AdminLogin = () => {

    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isLoggedIn && auth.user?.role == "ADMIN") {
            navigate("/admin/books")
        }
    })


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleInputChange(event, field) {
        let value = event.target.value;
        switch (field) {
            case "username": setUsername(value); break;
            case "password": setPassword(value); break;
        }

        setErrorMessage("");
    }


    function handleSubmit() {
        if(validateForm()) {
            loginUser(username, password)
            .then(response => {
                if(response.status === 200) {
                    const userInfo = response.data;
                    if(userInfo.role == "ADMIN") {
                        auth.login(userInfo, password);
                        navigate(location.state?.path || "/admin/books");
                    } else {
                        setErrorMessage("Invalid loggin credentials");
                    }
                }
            })
            .catch(error => {
                setErrorMessage(error.response?.data.message);
            })
        }
    }

    function validateForm() {
        if (username == '') {
            setErrorMessage("Username cannot be empty");
            return false;
        }
        if (username.length < 3) {
            setErrorMessage("Username must contain atleast 3 characters");
            return false;
        }
        if (password == '') {
            setErrorMessage("Password cannot by empty");
            return false;
        }
        if (password.length < 5) {
            setErrorMessage("Password must contain atleast 5 characters");
            return false;
        }
        return true;
    }

    return ( 
        <div className="AdminLogin">
            <div className="form-holder">
                <div className="form">
                    <div className="heading">
                    <h1>Admin Login</h1>
                    <p>Login here!</p>
                    </div>

                    <div className="form-element-holder">
                        { errorMessage &&  <div className="error-message">{errorMessage}</div> }
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
                        <button className="btn btn-black" onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;