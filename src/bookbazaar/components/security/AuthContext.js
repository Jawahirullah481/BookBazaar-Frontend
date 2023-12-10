import { createContext, useContext, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState({ userid: 1, username: "Jawa", email: "Jawa481@gmail.com", role: "USER" });
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/home";

    function login(username, password) {
        setUser({ userid: 1, username: "Jawa", email: "Jawa481@gmail.com", role: "USER" });
        setIsLoggedIn(true);
        navigate(redirectPath, {replace: true});
    }

    function logout() {

        const role = user.role;
        setUser(null);
        setIsLoggedIn(false);
        
        if(role === "USER") {
            navigate("/home");
        }else {
            navigate("/admin/login");
        }

    }

    return ( 
        <AuthContext.Provider value={ {user, isLoggedIn, login, logout} }>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;