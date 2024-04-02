import React from 'react'
import { Navigate } from 'react-router-dom';

function NotProtectedRoutes({children}) {

    const token=localStorage.getItem('userToken');
    if(token){
return <Navigate to="/Home" replace/>
    }
    else{
        return children;
    }
  
}

export default NotProtectedRoutes