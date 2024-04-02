import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, Slide, toast } from "react-toastify";

function ProtectedRoutes({children}) {
    const token= localStorage.getItem('userToken');
    console.log(children);

    if(token){
        console.log("token");
        return children;

    }
    else{
        console.log("not token");
        // toast.error("please login to ba able to see the products", {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     transition: Slide,
        //     });
        return <Navigate to='/Login' replace/>
    }

}

export default ProtectedRoutes