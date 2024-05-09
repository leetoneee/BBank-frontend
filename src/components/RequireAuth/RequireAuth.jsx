import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const maNhom = useSelector((state) => state.user.maNhom)

    if (!maNhom) {
        return <Navigate to='/login' />
    }

    return children;
}