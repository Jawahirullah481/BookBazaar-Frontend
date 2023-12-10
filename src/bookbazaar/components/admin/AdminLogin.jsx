import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import '../../css/form.css';
import '../../css/general.css';
import '../../css/admin.css';
import { useState } from "react";

const AdminLogin = () => {

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
                        <button className="btn btn-black">Login</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminLogin;