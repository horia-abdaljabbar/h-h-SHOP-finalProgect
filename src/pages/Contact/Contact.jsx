
import React, { useEffect, useState } from 'react'
import { Bounce, Slide, toast } from "react-toastify";
import axios from 'axios';
import './Contact.css'
import Loader from '../../components/Loader/Loader';

function Contact() {


  let [profile,setProfile]=useState([]);
  let [loader, setLoader] = useState(false);

  const token = localStorage.getItem("userToken");

const getProfile=(async ()=>{
setLoader(true);
  try{
    const { data } =await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    console.log(data.user);
    setProfile(data.user);
     setLoader(false);

  }
  catch(error){
    setLoader(false);
    toast.error(error.response.data.message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

console.log(error);
  }
})



  useEffect(()=>{
getProfile();
  },[])

  if(!loader)
  return (
      
      <>
     <div className='m-auto'> 

                <h3>{profile.email}</h3>
     </div>
                
      </>
  )

  if(loader)
 return  <Loader/>
}

export default Contact