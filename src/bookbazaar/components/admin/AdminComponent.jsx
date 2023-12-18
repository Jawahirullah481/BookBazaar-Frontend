import { Route, Routes } from "react-router-dom";
import AdminContent from "./AdminContent";
import AdminLogin from "./AdminLogin";

const AdminComponent = () => {
    return (
        <div className="AdminComponent">
            <Routes>
                <Route path="login" element={<AdminLogin />}></Route>
                <Route path="*" element={<AdminContent />}></Route>
            </Routes>
        </div>
    );
}

export default AdminComponent;