import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"

const ProtectedRouteAdmin = ({children}) => {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated)

    if(!isAuthenticated || sessionStorage.getItem('role') !== 'ADMIN'){
        return <Navigate to="/login"></Navigate>
    } else {
        return children;
    }
}

export default ProtectedRouteAdmin