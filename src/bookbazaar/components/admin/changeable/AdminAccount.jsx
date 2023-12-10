import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/UsersApiService";

const AdminAccount = () => {

    const [adminDetails, setAdminDetails] = useState(null);

    useEffect(() => {
        setAdminDetails(getUserDetails)
    }, [])

    function handleOnChange(event, property) {

        let updatedUser = null;

        switch (property) {
            case "username": {
                updatedUser = { ...adminDetails, username: event.target.value };
            }; break;
            case "email": {
                updatedUser = { ...adminDetails, email: event.target.value };
            }; break;
            case "password": {
                updatedUser = { ...adminDetails, password: event.target.value };
            }; break;
        }

        setAdminDetails(updatedUser);
    }

    function updateAdminDetails() {

    }

    return (
        <div className="AdminAccount">
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
                            <input type="text" name="username" value={adminDetails.username} onChange={(event) => handleOnChange(event, "username")} />
                        </div>
                        <div className="form-element">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" value={adminDetails.email} onChange={(event) => handleOnChange(event, "email")} />
                        </div>
                        <div className="form-element">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={adminDetails.password ? adminDetails.password : "lsdkfjslkfj"} onChange={(event) => handleOnChange(event, "password")} />
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