import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const user = useSelector((state) => state.auth.user)

    if (!user) {
        return <Navigate to='/login' />
    }
    return children;
}