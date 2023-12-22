import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center mx-auto">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;