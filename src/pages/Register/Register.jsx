import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import { object, string, number } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
//import {UserContext} from "../../Context/User.jsx"

function Register() {
 // const {userName}=useContext(UserContext);
  //console.log(userName);
  let [loader,setLoader]=useState(false);
  let [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();
  let [errors, setErrors] = useState([]);
  const validateData = async () => {

    const RegisterSchema = object({
      userName: string().min(5).max(20).required(),
      email: string().required().email(),
        password: string().min(5).max(20).required(),
        image: string().required(),

    });

    try {
      await RegisterSchema.validate(user);
      return true;
    } 
    catch (error) {
      console.log("validayion error",error.errors);
      setErrors(error.errors);
      if (errors.length >0) {
        errors.map((error)=>{
          console.log(error);
          toast.error(error, {
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

          // const validationErrors={};
          // error.inner.forEach(err =>{
          //   //console.log(error.path);
          //   validationErrors[err.path]=err.message;
          //   setErrors(validationErrors);
          // })
          return false;

        })
      
      } 
      else {
        toast.error("there is an error", {
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
      }
      return false;

    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    // console.log(user);
  //  setLoader(true);
    console.log("loadrt",loader);

     try{
      setLoader(true);
      setTimeout(()=>setLoader(false),2500);
      if (await validateData()) {

        const formData = new FormData();
        formData.append("userName", user.userName);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("image", user.image);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,formData);
        console.log("data::::",data);

       

      }

      //console.log("loadrt",loader);
     }
        

    
    
    catch (error) {

      console.log("error",error);
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
    }
      
  };

  const handleImg = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: files[0] });
  };

  return (
    <>
      <form
        className="registerForm shadow p-5 mb-5 bg-body rounded"
        onSubmit={handleForm}
      >
            <h1 className="authTitle">Signup</h1>

        {/* <p>welcome {userName}</p> */}
        <div className=" ms-auto">
         <div className="d-flex flex-column mb-4">
         <div className="col">
            <input
              type="text"
              className="form-control userName "
              value={user.userName}
              name="userName"
              onChange={handleInput}
              placeholder="user name"
            />
          </div>
<span>{errors.userName}</span>
         </div >
        <div className="d-flex flex-column mb-4 ">
        <div className="col">
            <input
              type="email"
              className="form-control email"
              value={user.email}
              name="email"
              onChange={handleInput}
              placeholder="email"
            />
          </div>
          <span>{errors.email}</span>
        </div>

         <div className="d-flex flex-column  mb-4">
         <div className="col">
            <input
              type="password"
              className="form-control password"
              value={user.password}
              name="password"
              placeholder="password"
              onChange={handleInput}
            />
            {/* { (errors=='the password is required')?<p className="errorMsg">{errors}</p>:''} */}
          </div>
          <span>{errors.password}</span>
         </div>
          <div className="d-flex flex-column ">
          <div className="col">
          <label className="mb-2">choose an image</label>

            <div className="imagePart d-flex align-items-start justify-content-evenly form-control gap-2" placeholder="image">
              <input
                type="file"
                className="image"
                name="image"
                onChange={handleImg}
              />
              {/* { (errors=='image is required')?<p className="errorMsg">{errors}</p>:''} */}
            </div>
            <span>{errors.image}</span>

          </div>
          </div>
          <div className="col d-flex flex-column align-items-end">
          <NavLink className="haveAccount me-1" to="/Login">
            Already hava an account?
          </NavLink>
          <button type="submit" className="submitBtn pt-1 pb-1" disabled={(loader)?'disapled':''}>
          {(!loader)?'Signup':'wait to Signup....'}   
          </button>
          </div>
         
        </div>
      </form>
    </>
  );
}

export default Register;
