import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();
const UserContextProvider = ({children}) => {
  console.log("im in the usercontext");
  const [userToken,setUserToken]=useState(localStorage.getItem('userToken'));
   const [userName, setUserName] = useState(null);
   const [userId, setUserId] = useState(null);


  const getUserData=()=>{

    console.log(userToken);
     if(userToken!=null)
     {
        const decoded = jwtDecode(userToken);
        console.log(decoded);
        setUserName(decoded.userName); 
        setUserId(decoded.userId); 


      }
   };
   useEffect(()=>{
    getUserData();

   },[userToken])
  return<UserContext.Provider value={{setUserToken,userName,setUserName,userId}}>
    {children}
  </UserContext.Provider>
};

export default UserContextProvider;
