import React from "react";
import "./SendCode.css";
import { NavLink } from "react-router-dom";
import { object, string, number } from "yup";
import { useState } from "react";
import { Bounce, Slide, toast } from "react-toastify";
//import { UserContext } from "../../Context/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SendCode() {
  let [loader,setLoader]=useState(false);
    //const {userName}=useContext(UserContext);
    const navigate = useNavigate();
    let [user, setUser] = useState({
      email: "",
    });
  
    let [errors, setErrors] = useState([]);
const validateData = async () => {
  const SendCodeSchema = object({
    email: string().email().required(),
  });

  try {
    await SendCodeSchema.validate(user);
    return true;
  } catch (error) {
    setErrors(error.errors);
    console.log("validation", errors);
    console.log("validation length", errors.length);

    if(errors.length>0)
    {
      errors.map((error)=>{
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
          });
          setLoader(false);

      })
      
    }
    else{
      toast.error("there is an error", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
        });
        setLoader(false);

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

  try {
    setLoader(true);

    if (await validateData()) {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        user
      );
      if (data.message === "success") {
        toast.success('check your email to take the code', {
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
 //localStorage.setItem('userToken',data.token);
        navigate("/ForgetPassword");
        setLoader(false);

      }
    }
  } catch (error) {
    toast(error.response.data.message, {
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
  return (
    <>
      <form
        className="loginForm shadow p-5 mb-5 bg-body rounded"
        onSubmit={handleForm}
      >

        <p className="sendCodePara">
          please enter your <span className="emailWord">email</span> to
          continue...
        </p>
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
          {/* <div className="col d-flex flex-column align-items-end">
            <NavLink className="resetPasswordBtn" to="/ForgetPassword"> Reset Password</NavLink>
          </div> */}

<button type="submit" className="submitBtn pt-1 pb-1" disabled={(loader)?'dispaled':''}>
            {(!loader)?'Send Code':"wait to Send Code..."}
          </button>
        </div>
      </form>
    </>
  );
}

export default SendCode;
