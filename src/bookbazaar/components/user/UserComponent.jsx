import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import UserContent from "./UserContent";

const UserComponent = () => {
    return (
        <div className="UserComponent">
                <HeaderComponent />
                <Routes>
                    <Route path="*" element={<UserContent />}></Route>
                </Routes>
        </div>
    );
}

export default UserComponent;