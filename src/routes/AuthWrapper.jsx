import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.user.users);
    return user ? children : <Navigate to={'/login'} />
}

export const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.user.users);
    return !user ? children : <Navigate to={'/'} />
}