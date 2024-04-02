import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { object, string, number } from "yup";
import { Bounce, Slide, toast } from "react-toastify";
import './Order.css'


function Order() {
    const token = localStorage.getItem("userToken");
    let [order, setOrder] = useState({
      couponName: "",
      address: "",
      phone: "",

    });
   

    const[products,setProducts]=useState([]);
    let [errors, setErrors] = useState([]);
    const validateData = async () => {
      const LoginSchema = object({
        couponName: string().required(),
        address: string().required(),
        phone: number().required(),
      });
  
      try {
  
        await LoginSchema.validate(order);
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
  
        }
        return false;
      }
    };
  
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setOrder({ ...order, [name]: value });
    };
  
    const handleForm = async (e) => {
      e.preventDefault();
      console.log(order);
      //console.log(userName);
  
  
      try {
        if (await validateData()) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/order`,
            order,
            {
              headers:{
                Authorization:`Tariq__${token}`
              }
            }
  
          );

          console.log(data);
  
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
    

    const getCart = async () => {
        try{
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          });
          console.log(data.products);
          setProducts(data.products);

      
        }
        catch(error){
    console.log(error);
        }
      };


      useEffect(() => {
        getCart();
      }, []);

  return (


    <>
    <div className='container'>
    
    <div className="products d-flex  gap-5  flex-wrap justify-content-evenly  border border-danger-subtle p-3 rounded  m-auto">
          {products.map((product) => (
            <div key={product._id}>
              <div className="col ">
                <div className="shadow bg-body rounded position-relative" style={{ width: "10rem" }}>
                 <img
                    src={product.details.mainImage.secure_url}
                    className="card-img-top shadow p-3 bg-body rounded"
                    alt="product-img"
                  />

                  <span className='position-absolute bottom-0 start-0 quantity d-flex justify-content-center align-items-center'>{product.quantity}</span>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div className='info d-flex flex-column gap-2 align-items-center mt-4'>
        <span className='text-secondary fs-4'>total items: <span className='text-danger fs-3'>{products.reduce(
            (previousValue, currentValue, index) => previousValue + currentValue.quantity, 
            0)}</span></span>
        <span className='text-secondary fs-4'>total price: <span className='text-danger fs-3'>{products.reduce(
            (previousValue, currentValue, index) => Math.ceil(previousValue + currentValue.quantity * currentValue.details.finalPrice), 
            0)}$</span></span>

      </div>
        <form
        className="loginForm shadow p-5 mb-5 bg-body rounded mt-5"
        onSubmit={handleForm}
      >
                    <h1 className="authTitle">order</h1>

        <div className="m-auto">
          <div className="col">
            <input
              type="text"
              className="form-control email mb-4"
              
            //   value={user.email}
              name="coupon"
              onChange={handleInput}
              placeholder="Coupon"
            />
          </div>

          <div className="col">
        <input
          type="text"
          className="form-control password mb-4"
         // value={user.password}
          name="address"
          placeholder="address"
          onChange={handleInput}
        />
        </div>

<div className="col">
        <input
          type="text"
          className="form-control code mb-4"
          //value={user.password}
          name="phone"
          placeholder="phone"
          onChange={handleInput}
        />
          <div className="col d-flex flex-column align-items-end">
          {/* disabled={(loader)?'disapled':''} */}
          <button type="submit" className="submitBtn pt-1 pb-1" >
            {/* { {(!loader)?"Login":" wait to login again..."} } */}
            order
          </button>
         </div>
        </div>

        </div>
      </form>
    </>
   
  )
}

export default Order