import { useEffect, useState } from "react";
import { getUserDetails, updateUserDetails } from "../../api/UsersApiService";
import { useAuth } from "../../security/AuthContext";
import Popup from "../../Popup";

const AdminAccount = () => {

    const auth = useAuth();
    const [popup, setPopup] = useState(null);
    const [adminDetails, setAdminDetails] = useState(null);

    useEffect(() => {
        fetchAdminDetails();
    }, [])

    function fetchAdminDetails() {
        getUserDetails(auth.user.id)
            .then(response => {
                setAdminDetails({ ...response.data, password: auth.user.password })
            })
            .catch(error => {
                setPopup({ type: "error", message: "Error while getting admin details" })
            })
    }

    function handleOnChange(event, property) {

        let updatedUser = null;

        switch (property) {
            case "password": {
                updatedUser = { ...adminDetails, password: event.target.value };
            }; break;
        }

        setAdminDetails(updatedUser);
    }

    function updateAdminDetails() {
        if (adminDetails.password.length < 5) {
            setPopup({ type: "error", message: "Password cannot be empty" });
        }
        else {
            updateUserDetails(auth.user.id, adminDetails)
                .then(response => {
                    if (response.status == 200) {
                        setPopup({ type: "success", message: "Admin Details updated successfully" });
                        auth.changeCredentials(adminDetails.username, adminDetails.email, adminDetails.password);
                    }
                })
                .catch(error => {
                    setPopup({ type: "error", message: "Error while updating admin details" });
                    fetchAdminDetails();
                })
        }
    }

    return (
        <div className="AdminAccount">
            {popup && <Popup popupData={popup} />}
            <div className="page-title">Account</div>
            {adminDetails &&
                <div className="admin-details-wrapper">
                    <div className="profile-holder">
                        <div className="img-holder">
                            <div className="img">{adminDetails.username.substring(0, 2).toUpperCase()}</div>
                        </div>
                        <div className="profile-overview">
                            <h2>{adminDetails.username}</h2>
                            <p className="mail">{adminDetails.email}</p>
                            <p>Administrator - Book Bazaar</p>
                        </div>
                    </div>
                    <h3>Account</h3>
                    <div className="account-details">
                        <div className="form-element">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={adminDetails.username} />
                        </div>
                        <div className="form-element">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={adminDetails.email} />
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={adminDetails.password} onChange={(event) => handleOnChange(event, "password")} />
                        </div>
                        <div className="form-element">
                            <label htmlFor="username">Title</label>
                            <input type="text" name="title" value="Administrator" />
                        </div>
                    </div>
                    <button className="btn btn-red" onClick={updateAdminDetails}>Update</button>
                </div>
            }
        </div>
    );
}

export default AdminAccount;