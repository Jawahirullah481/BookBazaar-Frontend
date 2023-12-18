import { NavLink } from "react-router-dom";

const EmptyComponent = ({image, message, redirectLink, redirectMessage}) => {
    return ( 
        <div className="EmptyComponent">
            {image}
            <h2>{message}</h2>
            <NavLink to={redirectLink} className="btn btn-empty">{redirectMessage}</NavLink> 
        </div>
     );
}
 
export default EmptyComponent;