import React, { useEffect, useState } from "react";
import "./Cart.css";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Bounce, Slide, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";


function Cart() {
  let [cart, setCart] = useState([]);
  let [quantity, setQuantity] = useState([]);
  let [clickedPlus, setClickedPlus] = useState(false);
  let [clickedMinus, setClickedMinus] = useState(false);
  let [deleteClicked, setDeleteClicked] = useState(false);
  let [deleteCartClicked, setDeleteCartClicked] = useState(false);
  let [summaryClicked, setSummaryClicked] = useState(false);

  let [loader, setLoader] = useState(false);


  const token = localStorage.getItem("userToken");

  const getCart = async () => {
    setLoader(true);

    try{
      const { data } =await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      console.log(data.products);
      setCart(data.products);

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
  };

  const decrease = async (id) => {
    setClickedMinus(true);
    setClickedPlus(false);
    setLoader(true);

   try{

    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
      {
        productId: id,
      },

      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );

    console.log("when decrease", data.cart.products);
    setQuantity(data.cart.products);
    setLoader(false);

   }

   catch(error){
    setLoader(false);
console.log(error);
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

  const increase = async (id) => {

    setClickedMinus(false);
    setClickedPlus(true);
    setLoader(true);
try{
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
    {
      productId: id,
    },

    {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    }
  );

  console.log(data.cart.products);
  setQuantity(data.cart.products);
  setLoader(false);

}
catch(error){
setLoader(false);
console.log(error);
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

  const deleteProduct = async (id) => {
    setLoader(true);

  try{
  setDeleteClicked(true);

    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/removeItem`,
      {
        productId: id,
      },

      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    console.log("delete", deleteClicked);
    setDeleteClicked(false);
    setLoader(false);

  }
  catch(error){
    setLoader(false);
    console.log(error);
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


  const deleteCart = async () => {
    setLoader(true);
    setDeleteCartClicked(true);

    try{

      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,null,
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      }
      
      
      )
      setDeleteCartClicked(false);

      console.log(data);
      setLoader(false);

    }
    catch(error){
      setLoader(false);
      console.log(error);
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
    const showSummary= ()=>{
      setSummaryClicked(true);

    }

  useEffect(() => {
    getCart();
  }, [deleteClicked,deleteCartClicked]);
 useEffect(() => {
  showSummary();
  }, [summaryClicked,clickedMinus,clickedPlus,quantity]);



 
if(!loader)
{
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="tableSection col-lg-9 col-md-12">
            <h4>shopping cart</h4>
          <table className="table ">
            <thead>
              <tr>
                <th >product details</th>
                <th scope="col">quantity</th>
                <th scope="col">price</th>
                <th scope="col">final price</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr
                  className="  shadow p-2 mb-5 bg-body rounded border-2 "
                  key={product.productId}
                >
                  <td scope="row" className="w-50">
                    <div className="d-flex flex-column gap-2">
                      <span className="w-auto">{product.details.name} </span>
                      <img src={product.details.mainImage.secure_url}></img>
                    </div>
                  </td>
                  <td scope="row">
                    <div className="d-flex gap-2">
                      {clickedMinus
                        ? quantity.map((productQuantity) =>
                            product.productId == productQuantity.productId ? (
                              productQuantity.quantity > 1 ? (
                                <button
                                  key={quantity.productId}
                                  className="decreaseBtn"
                                  onClick={() => {
                                    decrease(product.productId);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="minusIcon"
                                    icon={faMinus}
                                  />
                                </button>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )
                          )
                        : clickedPlus
                        ? quantity.map((productQuantity) =>
                            product.productId == productQuantity.productId ? (
                              productQuantity.quantity > 1 ? (
                                <button
                                  key={quantity.productId}
                                  className="decreaseBtn"
                                  onClick={() => {
                                    decrease(product.productId);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="minusIcon"
                                    icon={faMinus}
                                  />
                                </button>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )
                          )
                        : cart.map((productQuantity) =>
                            product.productId == productQuantity.productId? (productQuantity.quantity>1)?
                            (
                              <button
                                key={quantity.productId}
                                className="decreaseBtn"
                                onClick={() => {
                                  decrease(product.productId);
                                }}
                              >
                                <FontAwesomeIcon
                                  className="minusIcon"
                                  icon={faMinus}
                                />
                              </button>
                            ):''
                            
                            : (
                              ""
                            )
                          )}
                      <span>
                        {clickedMinus || clickedPlus
                          ? quantity.map((productQuantity) =>
                              product.productId == productQuantity.productId
                                ? productQuantity.quantity
                                : ""
                            )
                          : cart.map((productQuantity) =>
                              product.productId == productQuantity.productId
                                ? productQuantity.quantity
                                : ""
                            )}
                      </span>
                      <button
                        className="increaseBtn"
                        onClick={() => {
                          increase(product.productId);
                        }}
                      >
                        <FontAwesomeIcon className="plusIcon" icon={faPlus} />
                      </button>
                    </div>
                  </td>
  
                  {<td scope="row">{product.details.price}$</td>}
                  <td scope="row" className="finalCost">
                    {clickedMinus || clickedPlus
                      ? quantity.map((productQuantity) =>
                          product.productId == productQuantity.productId
                            ? Math.ceil(productQuantity.quantity *
                              product.details.finalPrice)
                            : ""
                        )
                      : cart.map((productQuantity) =>
                          product.productId == productQuantity.productId
                            ? Math.ceil(productQuantity.quantity *
                              product.details.finalPrice
                            ): ""
                        )}
                    $
                  </td>
                  <td scope="row">
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        deleteProduct(product.productId);
                      }}
                    >
                      <FontAwesomeIcon className="trashIcon" icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {cart.length>0?<div className="summarySection  col-md-12 col-lg-3">
            <h4>operations on the order</h4>
          <div className="summary d-flex flex-column gap-3 mt-5 shadow p-2 mb-5 bg-body rounded border-2">
  
  <button  className="deleteCartBtn  btn btn-danger"
              onClick={deleteCart}>Delete Cart</button>
  {/* <span>total items: <span className="fw-bolder">
  </span>  {
  cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0,
  )}</span>
  <span>total Price: <span className="fw-bolder">{totalCost}$</span></span> */}
  <NavLink to="/Order" className='checkout w-100 p-1 btn btn-secondary'>checkout </NavLink>

  </div>
          </div>:''}
        </div>
        <Link to='/Categories' className="mb-5 col-12"><img src="/arrow.svg" className="arrowIcon" ></img>Continue Shopping</Link>

      </div>
    </>
  );
                    }
  else{
    return <Loader/>
  }
}



export default Cart;
