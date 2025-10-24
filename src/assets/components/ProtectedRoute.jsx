import React from 'react'
import Login from './Login';
const ProtectedRoute = ({children}) => {

    // const navigate = useNavigate();
    
    if(localStorage.getItem("userData")){
        return children
    }
    else{
        return <Login/>

    }   


}

export default ProtectedRoute