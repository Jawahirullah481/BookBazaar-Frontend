import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../../api/UsersApiService";
import { useAuth } from "../../security/AuthContext";
import Popup from "../../Popup";

const Profile = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const auth = useAuth();
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        populateUserDetails()
    }, [])

    function populateUserDetails() {
        getUserDetails(auth.user.id)
            .then(response => {
                console.log(response.data)
                let userDetailsResponse = { ...response.data, password: auth.user.password };
                setUserDetails(userDetailsResponse);
            })
            .catch(error => console.log("Error while retreiving data", error));
    }


    /* ------------------------ */


    function validateUserDetails(user) {

        console.log("User object in validation : ", JSON.stringify(user))

        // Checking for 0 length
        for (const property in user) {
            if (user.hasOwnProperty(property)) {
                if (typeof user[property] === 'object' && user[property] !== null) {
                    // If the property is an object, recursively call the function
                    if (!validateUserDetails(user[property])) {
                        return false;
                    }
                }
                if (!user[property]) {
                    setErrorMsg(`${property} cannot be empty`);
                    return false;
                }
            }
        }

        // Checking for username and password length
        if (userDetails.username.length < 3) {
            setErrorMsg("Username must be 3 characters length");
            return false;
        }
        if (userDetails.password.length < 5) {
            setErrorMsg("Password must be 5 characters length");
            return false;
        }
        if (userDetails.address.pin.length < 6) {
            setErrorMsg("Invalid PIN");
            return false;
        }
        if (userDetails.address.mobile.length < 10) {
            setErrorMsg("Invalid mobile number");
            return false;
        }

        return true;
    }

    function editUserDetails() {
        if (validateUserDetails(userDetails)) {
            // Continue with other asynchronous operations (e.g., updateUserDetails)
            console.log("User Details when submit : " + userDetails)
            updateUserDetails(auth.user.id, userDetails)
                .then(response => {
                    console.log("Response is ", response);
                    if (response.status === 200) {
                        setPopup({ type: "success", message: "User details successfully updated" });
                        auth.changeCredentials(userDetails.username, userDetails.email, userDetails.password);
                        setErrorMsg("")
                    } else {
                        setPopup({ type: "error", message: "Error while updating user details" });
                        populateUserDetails();
                    }
                })
                .catch(error => {
                    console.log(error)
                    console.error("Error during updateUserDetails:", error.response);
                    setErrorMsg(error.response.data.debugMessage);
                    setPopup({ type: "error", message: "Error while udpating user details" });
                });
        } else {
            console.log("Validation failed");
        }
    }



    return (
        <div className="Profile">
            {popup && <Popup popupData={popup} />}
            <h1>Your Profile</h1>
            {
                userDetails &&
                <div className="profile-holder">
                    {errorMsg && <div className="error-msg">{errorMsg}</div>}
                    <div className="account-holder">
                        <div className="profile-img-holder">
                            <div className="profile-img">{userDetails.username.substring(0, 2).toUpperCase()}</div>
                            <div className="profile-username">{userDetails.username}</div>
                        </div>
                        <div className="account-details-holder">
                            <TextField type="text" property="username" userDetails={userDetails} updateUser={setUserDetails} classes="w-100" />
                            <TextField type="text" property="email" userDetails={userDetails} updateUser={setUserDetails} classes="w-100" />
                            <TextField type="password" property="password" userDetails={userDetails} updateUser={setUserDetails} classes="w-100" />
                        </div>
                    </div>
                    <div className="address-holder">
                        <TextField type="text" property="address" userDetails={userDetails} updateUser={setUserDetails} classes="w-100" />
                        <TextField type="text" property="city" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                        <TextField type="text" property="state" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                        <TextField type="text" property="country" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                        <TextField type="text" property="pin" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                        <TextField type="text" property="landmark" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                        <TextField type="text" property="mobile" userDetails={userDetails} updateUser={setUserDetails} classes="w-30" />
                    </div>
                    <button className="btn btn-orange" onClick={editUserDetails}>Edit Details</button>
                </div>
            }
        </div>
    );
}

export default Profile;

const TextField = ({ type, property, userDetails, updateUser, classes }) => {


    const [propertyValue, setPropertyValue] = useState('');

    useEffect(() => {
        switch (property) {
            case "username": {
                setPropertyValue(userDetails.username);
            }; break;
            case "email": {
                setPropertyValue(userDetails.email);
            }; break;
            case "password": {
                setPropertyValue(userDetails.password);
            }; break;
            case "address": {
                setPropertyValue(userDetails.address?.address || "");
            }; break;
            case "city": {
                setPropertyValue(userDetails.address?.city || "");
            }; break;
            case "state": {
                setPropertyValue(userDetails.address?.state || "");
            }; break;
            case "country": {
                setPropertyValue(userDetails.address?.country || "");
            }; break;
            case "pin": {
                setPropertyValue(userDetails.address?.pin || "");
            }; break;
            case "landmark": {
                setPropertyValue(userDetails.address?.landmark || "");
            }; break;
            case "mobile": {
                setPropertyValue(userDetails.address?.mobile || "");
            }; break;
        }
    });

    function handleOnChange(event, key) {


        let updatedUser = null;

        switch (key) {
            case "username": {
                updatedUser = { ...userDetails, username: (() => {
                    let username = event.target.value;
                    if(/\d/.test(username)) {
                        return userDetails.username;
                    }
                    return username;
                })() };
            }; break;
            case "email": {
                return;
            };
            case "password": {
                updatedUser = { ...userDetails, password: event.target.value };
            }; break;
            case "address": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        address: event.target.value
                    }
                };
            }; break;
            case "city": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        city: event.target.value
                    }
                }
            }; break;
            case "state": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        state: event.target.value
                    }
                }
            }; break;
            case "country": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        country: event.target.value
                    }
                }
            }; break;
            case "pin": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        pin: (() => {
                            let pin = event.target.value;
                            if (isNaN(pin) || pin.length > 6)
                                return userDetails.address.pin;
                            return pin;
                        })()
                    }
                }
            }; break;
            case "landmark": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        landmark: event.target.value
                    }
                }
            }; break;
            case "mobile": {
                updatedUser = {
                    ...userDetails,
                    address: {
                        ...userDetails.address,
                        mobile: (() => {
                            let mobile = event.target.value;
                            if (isNaN(mobile) || mobile.length > 10)
                                return userDetails.address.mobile;
                            return mobile;
                        })()
                    }
                }
            }; break;
        }

        updateUser(updatedUser);
        console.log(updatedUser)
        setPropertyValue(event.target.value);
    }

    return (
        <div className={`TextField ${classes}`}>
            <label htmlFor={property}>{property}</label>
            <input type={type} name={property} value={propertyValue} onChange={(event) => handleOnChange(event, property)} placeholder={property} />
        </div>
    )

}