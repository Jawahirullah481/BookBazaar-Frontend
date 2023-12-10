import { Route, Routes } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";
import UserComponent from "./UserComponent";

const UserWrapper = () => {

  

  return (
    <div className="UserWrapper">
        <Routes>
          <Route path="login" element={<UserLogin />}></Route>
          <Route path="signup" element={<UserSignup />}></Route>
          <Route path="*" element={<UserComponent />}></Route>
        </Routes>
    </div>
  );
}

export default UserWrapper;