import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            addAuthorization();
            setIsLoggedIn(true);
        }
    }, [user]);


    const login = (userDetails, passwordValue) => {
        localStorage.setItem(`token-${userDetails.id}`, ("Basic " + window.btoa(userDetails.username + ":" + passwordValue)));
        setUser((oldValue) => {
            return { ...userDetails, password: passwordValue }
        });
    };

    const addAuthorization = () => {
        apiClient.interceptors.request.use(config => {
            // Use the latest value of the username and password
            console.log("User id is : ", localStorage.getItem(`token-${user.id}`))
            // if (user) {
                config.headers.Authorization = localStorage.getItem(`token-${user.id}`);
            // }
            return config;
        });
    }


    const changeCredentials = (usernameValue, emailValue, passwordValue) => {
        localStorage.setItem(`token-${user.id}`, ("Basic " + window.btoa(usernameValue + ":" + passwordValue)));
        setUser((oldValue) => {
            return { ...oldValue, username: usernameValue, email: emailValue, password: passwordValue }
        });
    }

    const logout = () => {

        const role = user.role;
        localStorage.removeItem(`token-${user.id}`);
        setUser(null);
        setIsLoggedIn(false);
        
        if (role === "USER")
            navigate("/home");
        else
            navigate("/admin/login")
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout, changeCredentials }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;