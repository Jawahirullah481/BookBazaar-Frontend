import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/UsersApiService";

const Profile = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

        // GEt data from api
        setUserDetails(getUserDetails(1));

    }, [])

    function editUserDetails() {
        // update data
        console.log(userDetails)
    }

    return (
        <div className="Profile">
            <h1>
                Your Profile
            </h1>
            {
                userDetails &&
                <div className="profile-holder">
                    {errorMsg && <div className="error-msg">{errorMsg}</div> }
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
                setPropertyValue(userDetails.address.address);
            }; break;
            case "city": {
                setPropertyValue(userDetails.address.city);
            }; break;
            case "state": {
                setPropertyValue(userDetails.address.state);
            }; break;
            case "country": {
                setPropertyValue(userDetails.address.country);
            }; break;
            case "pin": {
                setPropertyValue(userDetails.address.pin);
            }; break;
            case "landmark": {
                setPropertyValue(userDetails.address.landmark);
            }; break;
            case "mobile": {
                setPropertyValue(userDetails.address.mobile);
            }; break;
        }
    });

    function handleOnChange(event, key) {

        let updatedUser = null;

        switch (key) {
            case "username": {
                updatedUser = { ...userDetails, username: event.target.value };
            }; break;
            case "email": {
                updatedUser = { ...userDetails, email: event.target.value };
            }; break;
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
                        pin: event.target.value
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
                        mobile: event.target.value
                    }
                }
            }; break;
        }

        updateUser(updatedUser);
        updatedUser = null;
        setPropertyValue(event.target.value);
    }

    return (
        <div className={`TextField ${classes}`}>
            <label htmlFor={property}>{property}</label>
            <input type={type} name={property} value={propertyValue} onChange={(event) => handleOnChange(event, property)} placeholder={property} />
        </div>
    )

}