import React from 'react'
import './ForgetPassword.css'
import { object, string, number } from "yup";
import { useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {
  let [loader,setLoader]=useState(false);

  let [user, setUser] = useState({
    email: "",
    password: "",
    code: "",
  });
  const navigate = useNavigate();
  let [errors, setErrors] = useState([]);
  const validateData = async () => {
    const ForgetPasswordSchema = object().shape({
      code: string().required(),
      password: string().min(5).required(),
      email: string()
        .required()
        .email()
    });

    try {
      await ForgetPasswordSchema.validate(user);
      return true;
    } catch (error) {
      setErrors(error.errors);
      if (errors.length >0) {
        errors.map((error)=>{
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
        })
      
      } else {
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

    try {
      setLoader(true);
setTimeout(()=>setLoader(false),2500);
      if (await validateData()) {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
          user
        );
        if (data.message === "success") {
          toast.success('the password changed successfully...', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
            setLoader(false);

       
        }
      }
    } catch (error) {
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
      setLoader(false);

    }
  };


  return  (
    <>
    <p>forget pass</p>
      <form
        className="loginForm shadow p-5 mb-5 bg-body rounded"
        onSubmit={handleForm}
      >
                    <h1 className="authTitle">Reset Password</h1>

        <div className="m-auto">
          <div className="col">
            <input
              type="email"
              className="form-control email mb-4"
              
             value={user.email}
              name="email"
              onChange={handleInput}
              placeholder="email"
            />
          </div>

          <div className="col">
        <input
          type="password"
          className="form-control password mb-4"
         value={user.password}
          name="password"
          placeholder="new password"
          onChange={handleInput}
        />
        </div>

<div className="col">
        <input
          type="text"
          className="form-control code mb-4"
          value={user.code}
          name="code"
          placeholder="code"
          onChange={handleInput}
        />
          <div className="col d-flex flex-column align-items-end">
          <button type="submit" className="submitBtn pt-1 pb-1" disabled={(loader)?'disapled':''}>
            {(!loader)?"Login":" wait to login again..."}
          </button>
         </div>
        </div>

        </div>
      </form>
    </>
  );

}

 

export default ForgetPassword