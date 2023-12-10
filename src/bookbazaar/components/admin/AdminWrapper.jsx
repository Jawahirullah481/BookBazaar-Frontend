import { Route, Routes } from "react-router-dom";
import AdminComponent from "./AdminComponent";
import AdminLogin from "./AdminLogin";

const AdminWrapper = () => {
    return (
        <div className="AdminWrapper">
            <Routes>
                <Route path="login" element={<AdminLogin />}></Route>
                <Route path="*" element={<AdminComponent />}></Route>
            </Routes>
        </div>
    );
}

export default AdminWrapper;