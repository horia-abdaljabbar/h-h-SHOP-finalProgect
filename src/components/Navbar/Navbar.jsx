import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import  "./Navbar.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Context/User";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { Bounce, Slide, toast } from "react-toastify";

function Navbar() {
  let location = useLocation();
  
  const { userName } = useContext(UserContext);
  const { setUserName } = useContext(UserContext);
  const { setUserToken } = useContext(UserContext);
  const { userToken } = useContext(UserContext);
 
  let [backGroundImg, setbackGroundImg] = useState("");
  let [aboveContent, setAboveContent] = useState("");
  let [clickedLogin, setClickedLogin] = useState(false);
  let [clickedRegister, setClickedRegister] = useState(false);
  const navigate = useNavigate();
  let [cart, setCart] = useState([]);
  let [loader, setLoader] = useState(false);
  let [productsNum, setProductsNum] = useState();

  const token = localStorage.getItem("userToken");
  const getCart = async () => {
    setLoader(true);

    try{
      const { data } =await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log("products:::",data.products);
      setCart(data.products);
       setLoader(false);
       const sum = cart.reduce(
        (previousValue, currentValue, index) => previousValue + currentValue.quantity, 
        0);
        console.log(sum);
        setProductsNum(sum);
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
  };
  
  //   if (location.pathname == "/") {
  //     setbackGroundImg("hero/home.jpg");
  //     setAboveContent("home");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //   } else if (location.pathname == "/Home") {
  //     setbackGroundImg("hero/home.jpg");
  //     setAboveContent("home");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //   } else if (location.pathname == "/Cart") {
  //     setbackGroundImg("hero/new.jpg");
  //     setAboveContent("cart");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //   } else if (location.pathname == "/Categories") {
  //     setbackGroundImg("hero/l.jpg");
  //     setAboveContent("cate");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //   } else if (location.pathname == "/Products") {
  //     setbackGroundImg("hero/ss.jpg");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //   } else if (location.pathname == "/Login") {
  //     setbackGroundImg("hero/ss.jpg");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //     setAboveContent("login");
  //   } else if (location.pathname == "/Register") {
  //     setbackGroundImg("hero/ss.jpg");
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //     setAboveContent("register");
  //   } else {
  //     setClickedRegister(false);
  //     setClickedLogin(false);
  //     setbackGroundImg("hero/oops.jpg");
  //     setAboveContent("404!!! Page Not Found");
  //     // document.getElementById('hero').removeAttribute('style');
  //   }
  // }, [location.pathname]);
    useEffect(() => {
      getCart();
  }, [productsNum,location.pathname]);
  const checkLogin = () => {
    setClickedRegister(false);
    setClickedLogin(true);
    
  };

  const checkRegister = () => {
    setClickedLogin(false);
    setClickedRegister(true);
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
  };

  const checkLogout = () => {
    localStorage.removeItem("userToken");
    setUserName(null);
    setUserToken(null);
  };




  return (
    <>
   
        <nav className="navbar nav navbar-expand-lg" id="navbar">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand w-25" href="#">
                <img
                  className="navbar-logo"
                  src="/logo.svg"
                  alt="Logo"
                ></img>
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-50">
                {(userName)?<> 
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link position-relative" to="/Cart">
                  <FontAwesomeIcon className="cartIcon" icon={faCartShopping} />
                  <span className="productsNum">{productsNum}</span>
                  </NavLink>
                </li>
                </>:<>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Categories">
                    Categories
                  </NavLink>
                </li>
                
                </>}
                
               
              </ul>

              {( userName ) ? 
                <>

<div className="dropdown">


  <ul className="d-flex gap-2">

    <Link className="btn btn-outline-danger" onClick={checkLogout} to="/Login"> Logout</Link>
    <Link className="btn btn-outline-success " to="/Profile">profile {userName}</Link>
  </ul>
</div>

                </>
               : 
                <>
                <div className="d-flex gap-4">
                  <Link
                    className="linkBtn pt-1 pb-1"
                    onClick={checkLogin}
                    to="/Login"
                    
                  >
                    Login
                  </Link>
                  <Link
                    className="linkBtn pt-1 pb-1"
                    onClick={checkRegister}
                    to="/Register"
                  >
                    Register
                  </Link>
                </div>
              </>
}

            </div>
          </div>
        </nav>
        {/* {(clickedLogin==true)?<div className="above"><Login/></div>:console.log("not login")}
         { (clickedRegister==true) ?<Register/>: console.log("not register")} */}
        {/* <h1 className="above">{aboveContent}</h1> */}
      {/* </div> */}
    </>
  );
}

export default Navbar;
