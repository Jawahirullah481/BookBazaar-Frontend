import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Authentication = ({ authorization }) => {

    const auth = useAuth();
    const location = useLocation();

    if (!auth.isLoggedIn) {
        if (authorization.includes("USER"))
            return <Navigate to={"/login"} state={ {path: location.pathname} }/>
        else
            return <Navigate to={"/admin/login"} state={ {path: location.pathname} } />
    }

    if (!(authorization.includes(auth.user.role))) {
        return <Navigate to={"/admin/login"} />
    }

    return (
        <Outlet />
    );
}

export default Authentication;