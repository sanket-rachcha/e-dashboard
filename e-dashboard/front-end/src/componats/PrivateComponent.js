import { Navigate, Outlet } from "react-router-dom";


function PrivateComponent() {
    const auth = localStorage.getItem('user');

    if (auth) {
        return <Outlet />;
    } else {
        return <Navigate to="/signup" />;
    }
}

export default PrivateComponent;
