import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "../../api/AdminApiService";

const AdminUsers = () => {

    const [users, setUsers] = useState(null);
    const tableHolder = useRef(null);
    const [tHeadClass, setTHeadClass] = useState('');

    useEffect(() => {
        setUsers(getAllUsers);
    }, [])

    function handleOnTableScroll(event) {
        if (tableHolder.current.scrollTop > 55) {
            setTHeadClass("thead-shadow")
        } else {
            setTHeadClass("")
        }
    }

    return (
        <div className="AdminBooks">
            <div className="page-title">Users</div>
            {users &&
                <div className="table-holder" onScroll={handleOnTableScroll} ref={tableHolder}>
                    <div className="table-top">
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Book ID" />
                            <button className="btn btn-orange btn-search">Search</button>
                        </div>
                        <div className="search-tf-holder">
                            <input type="text" placeholder="Search Book Name" />
                            <button className="btn btn-orange btn-search">Search</button>
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
                                        <td>{user.address.mobileNo}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="table-footer-holder">
                        <div className="table-footer">
                            <button className="btn-nav">Previous</button>
                            <button className="btn-nav">Next</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );

}

export default AdminUsers;