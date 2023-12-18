import { Navigate, Route, Routes } from "react-router-dom";
import AdminAccount from "./changeable/AdminAccount";
import AdminBooks from "./changeable/AdminBooks";
import AdminOrders from "./changeable/AdminOrders";
import AdminUsers from "./changeable/AdminUsers";
import AdminErrorPage from "./changeable/AdminErrorPage";
import Authentication from "../security/Authentication";
import '../../css/table.css';
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";

const AdminContent = () => {
    return (
        <div className="AdminContent">
            <AdminHeader />
            <SideMenu />
            <Routes>
                <Route element={<Authentication authorization={["ADMIN"]} />}>
                    <Route path="/" element={<Navigate to="books" />}></Route>
                    <Route path="books" element={<AdminBooks />}></Route>
                    <Route path="users" element={<AdminUsers />}></Route>
                    <Route path="orders" element={<AdminOrders />}></Route>
                    <Route path="account" element={<AdminAccount />}></Route>
                    <Route path="*" element={<AdminErrorPage />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;