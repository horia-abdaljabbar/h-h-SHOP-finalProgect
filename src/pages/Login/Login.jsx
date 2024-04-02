import React, { useEffect, useState } from "react";
import axios from "axios";
import { object, string, number } from "yup";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, Slide, toast } from "react-toastify";
import { UserContext } from "../../Context/User";
import { useContext } from "react";
function Login() {
 // const {userName}=useContext(UserContext);
 const { userName } = useContext(UserContext);

  console.log("user name to check:::",userName);
  const [loader ,setLoader]=useState(false);
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState([]);
  const validateData = async () => {
    const LoginSchema = object({
      email: string().email().required(),
      password: string().min(5).required(),
    });
    try {
      await LoginSchema.validate(user);
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
    console.log(user);
    //console.log(userName);

    setLoader(true);
setTimeout(()=>setLoader(false),2500);
    try {

      if (await validateData()) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signin`,
          user

        );

        if (data.message === "success") {

          toast.success('welcome to H&H shop', {
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
   localStorage.setItem('userToken',data.token);
   setUserToken(data.token);
   setLoader(true);
          navigate("/Home");

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


    }
  };
  

  return (
    <>
    {/* <p>welcome {userName}</p> */}
      <form
        className="loginForm shadow p-5 mb-5 bg-body rounded"
        onSubmit={handleForm}
      >
                    <h1 className="authTitle">Login</h1>

        <div className="m-auto">
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
          
          <div className="col d-flex flex-column align-items-end">
          <NavLink className="forgrtPassword me-1" to="/SendCode">
            forget Your password?
          </NavLink>
          {/* disabled={(loader)?'disapled':''} */}
          {/* disabled={(loader)?'disapled':''}  */}
          <button type="submit" className="submitBtn pt-1 pb-1" disabled={(loader)?'disapled':''}  >
          {(!loader)?'login':'wait to login....'}         </button>
         </div>
        </div>
      </form>
    </>
  );
}

export default Login;
