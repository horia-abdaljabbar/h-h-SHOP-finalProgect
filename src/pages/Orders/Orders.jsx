
import React, { useEffect, useState } from 'react'
import { Bounce, Slide, toast } from "react-toastify";
import axios from 'axios';
import './Orders.css'
import Loader from '../../components/Loader/Loader';

function Orders() {


  let [orders,setOrders]=useState([]);
  let [loader, setLoader] = useState(false);
  let [products,setProducts]=useState([]);
  const [image,setImage]=useState([]);
  let [length,setLength]=useState([]);

  const token = localStorage.getItem("userToken");
const totalLength=[];
const getProfile=(async ()=>{
setLoader(true);
  try{
    const { data } =await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    console.log(data.orders);
    console.log("orders::::",data.orders);
    setOrders(data.orders);
    //setProducts(data.orders.products);
   // setImage(data.orders.products.mainImage);
    console.log("products",data.orders.products);

    for(let i=1;i<=orders.length;i++){
      totalLength.push(i);
setLength(...length,i);
console.log(length);

    }
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
      

<div className="products d-flex flex-column gap-2 align-items-center">
      {orders.map((order) => 
        <div key={order._id}>
          {(order.finalPrice >0)?<div className="col ">
            <div className="shadow bg-body rounded p-3 col-md-4 col-lg-4" style={{ width: "20rem" }}>
      <div className='m-auto d-flex flex-column gap-2'>
        <h4>order{orders.indexOf(order)+1}
        </h4>
        <span className='fw-bold'><span className='fw-bolder text-danger'>{order.products.length}</span>products</span>

        <span className='fw-light'>total price:<span className='fw-bold  text-success'>{order.finalPrice}$</span></span>
        <span className='fw-light'>payment Type:<span className='fw-bold  text-success'>{order.paymentType}$</span></span>
        <span className='fw-light'>your address:<span><span className='fw-bold  text-success'>{order.address}</span></span></span>


<div>
  {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    products
  </button>
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">my orders</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          {order.products.map((product)=>
  <div key={product._id}>
{
  <>
  <h5>product({order.products.indexOf(product)+1})</h5>
    <h6>{product.productId.name}</h6>

    <div className='position-relative'>
    <img
                  className="userImg"
                  src={product.productId.mainImage.secure_url}
                  alt="user image"
                ></img>   

<span className='position-absolute bottom-0 start-0 quantity d-flex justify-content-center align-items-center'>{product.quantity}</span>
      </div>

<h4></h4>
</>
}

    </div>
        )}

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</div> */}

</div>

      </div>
              {/* <span className='position-absolute bottom-0 start-0 quantity d-flex justify-content-center align-items-center'>{product.quantity}</span> */}
              
            </div>
          </div>:''}
          </div>

      )}
    </div>
  )

  if(loader)
 return  <Loader/>
}

export default Orders