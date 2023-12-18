import { NavLink } from "react-router-dom";
import errorImage from "../../../assets/404.png"

const ErrorPage = () => {

    return ( 
        <div className="ErrorPage">
            <img src={errorImage} alt="" />
            <NavLink className="btn btn-red" to="/home">Go to Home</NavLink>
        </div>
     );
}
 
export default ErrorPage;