import { Route, Routes } from "react-router-dom";
import AdminContent from "./AdminContent";
import SideMenu from "./SideMenu";
import AdminHeader from "./AdminHeader";

const AdminComponent = () => {
    return ( 
        <div className="AdminComponent">
            <AdminHeader />
            <SideMenu />
            <Routes>
                <Route path="*" element={ <AdminContent /> }></Route>
            </Routes>
        </div>
     );
}
 
export default AdminComponent;