import { Route, Routes } from "react-router-dom";
import AdminComponent from "./AdminComponent";

const AdminWrapper = () => {
    return (
        <div className="AdminWrapper">
            <Routes>
                <Route path="*" element={<AdminComponent />}></Route>
            </Routes>
        </div>
    );
}

export default AdminWrapper;