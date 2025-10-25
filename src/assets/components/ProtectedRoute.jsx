import React from 'react'
import Login from './Login';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {

    // const navigate = useNavigate();
    
    const isAuthenticated = localStorage.getItem('userData');
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    return children;


}

export default ProtectedRoute