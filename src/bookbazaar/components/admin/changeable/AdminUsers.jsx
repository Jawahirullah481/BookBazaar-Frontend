import { useEffect, useRef, useState } from "react";
import { getAllUsers, getUserById } from "../../api/AdminApiService";
import Popup from "../../Popup";

const AdminUsers = () => {

    const [users, setUsers] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');
    const [popup, setPopup] = useState(null);
    const [searchUserId, setSearchUserId] = useState(null);
    const page = -1;

    useEffect(() => {
        getAllUsers(page)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                setPopup({ type: "error", message: "Error while getting Usrs" })
            });
    }, [])

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    /* --------- Searching -------------- */

    function handleOnSearchUserIdChange(event) {
        const value = event.target.value;
        if (!isNaN(value)) {
            setSearchUserId(value);
        }
    }

    function searchUserById() {

        if (searchUserId == null) {
            return;
        }

        if (searchUserId.length == 0 && (users.length > 1)) {
            return;
        }

        if (searchUserId) {
            getUserById(searchUserId)
                .then(response => {
                    setUsers([response.data]);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log("Error while gettin order")
                    setPopup({ type: "error", message: "No User Available" })
                })
        } else {
            getAllUsers(page)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    setPopup({ type: "error", message: "Error while getting users" })
                })
        }
    }


    return (
        <div className="AdminBooks">
            {popup && <Popup popupData={popup} />}
            <div className="page-title">Users</div>
            {users &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search User ID" value={searchUserId} onChange={(event) => handleOnSearchUserIdChange(event)} />
                            <button className="btn btn-orange btn-search" onClick={searchUserById}>Search</button>
                        </div>
                    </div>
                    <table>
                        <thead className={tHeadClass}>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Mobile No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address.address}</td>
                                        <td>{user.address.mobile}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <div className="table-footer-holder">
                        <div className="table-footer">
                            <button className="btn-nav">Previous</button>
                            <button className="btn-nav">Next</button>
                        </div>
                    </div> */}
                </div>
            }
        </div>
    );

}

export default AdminUsers;