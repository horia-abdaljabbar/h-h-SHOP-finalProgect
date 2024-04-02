import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';
import './ProductDetails.css'
import { Link } from 'react-router-dom';
import { Bounce, Slide, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";


function ProductDetails() {

    const {productId}=useParams();
    let [loader, setLoader] = useState(false);
    let [loaderMsg, setLoaderMsg] = useState(false);


const token =localStorage.getItem('userToken');
const[details,setDetails]=useState([]);
const [img,setImage]=useState([]);
const [extraImg,setExtraImg]=useState([]);
const [rating,setRating]=useState([]);

const[userReview,setUserReview]=useState({
comment:'add your comment',
rating:'add your rating',

});
const [reviews,setReviews]=useState([]);

const[error,setError]=useState('');

const [order,setOrder]=useState([]);
const starsArray=[1,2,3,4,5];
const [stars,setStars]=useState([]);





    const getProduct = async () => {
      setLoader(true);

      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        console.log(data);
        setDetails(data.product);
        setImage(data.product.mainImage);
        console.log(data.product.subImages);
        setReviews(data.product.reviews);
        console.log("reviews",data.product.reviews)
        setLoader(false);
        setRating(Math.ceil(data.avgRating));
        console.log(data.product.subImages);

      }
      catch(error){
  console.log(error);
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
      }
    };


    const addToCart=async (id)=>{
      setLoader(true);
      setTimeout(()=>setLoader(false),2500);
        try{
          const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
          {
            productId:id
          },
          {
            headers:{
              Authorization:`Tariq__${token}`
            }
          });
          console.log(data.message);
          
          if (data.message === "success") {

            
            toast.success('tha product added successfully', {
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
          setLoader(false);

        }
      
    
        catch(error){
          setLoader(false);

          console.log("error",error.response.data.message);
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

      
      }

      const handleForm=(async(e)=>{
        /// console.log( typeof e.target.value);
        e.preventDefault();
        console.log(userReview);
        try{
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,userReview,{
            headers:{
              Authorization:`Tariq__${token}`
            }
          });
          console.log(data);
         // setDetails(data);
          setLoader(false);
        }
      
        catch(error){
          console.log(error);
          setLoader(false);
          setError(error.response.data.message);
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
      });

      const handleReview=(async(e)=>{
      /// console.log( typeof e.target.value);
      e.preventDefault();
      const { name, value } = e.target;
      setUserReview({ ...userReview, [name]: value });

        })

        console.log(userReview);



const getOrder=(async()=>{
 // setLoader(true);

      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {
          headers:{
            Authorization:`Tariq__${token}`
          }
        });
        console.log("orders:",data.orders);
        setOrder(data.orders);
        setLoader(false);
      }
      catch(error){
  console.log(error);
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
      }
    

})
    useEffect(() => {
        getProduct();
    }, []);

    useEffect(() => {
      getOrder();
  }, [userReview]);

    console.log(productId);
if(!loader){
  return (
    <>  
    
    <div className='container'>
    
    <div className='row mt-5'>
      <div className='col-md-12 col-lg-6 col-xl-6'>
      <div className='start d-flex flex-column gap-2'>
      <img
                        src={img.secure_url}
                        className=" shadow  rounded mainImg  mb-5"
                        alt="product-img"
                      />
        <div className='d-flex justify-content-start gap-5'>
        <img
                        src={img.secure_url}
                        className=" shadow p-2 mb-5 extraImg rounded"
                        alt="product-img"
                      />
    <img
                        src={img.secure_url}
                        className=" shadow p-2 mb-5  extraImg rounded"
                        alt="product-img"
                      />
        </div>
    
      </div>
      </div>
      <div className=' col-md-12 col-lg-6 col-xl-6'>
      <div className='end d-flex flex-column gap-2'>
    <h3>{details.name}</h3>
    
<div>
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
see the description  </button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel"></h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          {details.description}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div className='d-flex '>
{(rating==1)?<img className='star' src="/star.svg"></img>: (rating==2)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:(rating==3)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(rating==4)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(rating==5)?<><img  className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:''}
  </div>


    <div className=" d-flex justify-content-start p-1">
                          {details.discount}%OFF
                        </div>
    
                        {details.discount != 0 ?  (
                          <div className="d-flex justify-content-start align-items-center gap-2 ">
                            <span className="price">{details.price}$</span>
                            <span className="finalPrice">
                              {details.finalPrice}$
                            </span>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-end align-items-center gap-2 ">
                            <span className="finalPrice">
                              {details.finalPrice}$
                            </span>
                          </div>
                        )}
    
                        {(token?<div>
                          <button className="deleteCartBtn  btn btn-danger" onClick={()=>addToCart(details._id)} disabled={(loader)?'disabled':''}>add to cart</button>
                          </div>:<div></div>)}
{(error==='can not review this product')?'': <form className='review d-flex flex-column gap-1 mt-5 mb-5 w-75 m-auto border border-danger-subtle p-3 rounded' onSubmit={handleForm}>
  <input type='text' name='comment' value={userReview.comment} onChange={handleReview} />
 <select onChange={handleReview} name='rating' value={userReview.rating}  className="form-select form-select-sm " aria-label="Small select example">
  <option selected>Add Your Review... </option>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
  <option value={4}>4</option>
  <option value={5}>5</option>
</select>
<button className="submitBtn pt-1 pb-1">add review</button>

 </form>}
 
    
                        </div>
      </div>

                        
    
    
                       
    
      </div>



      <div className='showReviews position-relative p-3'>

 <div className="d-flex justify-content-evenly gap-5  flex-wrap border border-danger-subtle p-5 rounded">
 <div className='reviewSign position-absolute top-0 bg-warning text-dark d-flex justify-content-center  align-items-center badge bg-primary text-wrap fs-5'>reviews</div>

            {reviews.map((review) => (
              <div key={review._id}>
                <div className="col d-flex">
                  <div
                    className="card shadow p-3 bg-body rounded position-relative "
                    style={{ width: "20rem" }}
                  >
                    <img
                      src={review.createdBy.image.secure_url}
                      className="card-img-top shadow p-3 mb-5 bg-body rounded"
                      alt="user-img"
                    />
                    <div className="card-body d-flex flex-column gap-3">
                    <span className='fw-bolder m-auto fs-4 text-warning'>{review.comment}
</span>
<div className='d-flex '>
{(review.rating==1)?<img className='star' src="/star.svg"></img>: (review.rating==2)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:(review.rating==3)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(review.rating==4)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(review.rating==5)?<><img  className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:''}
  </div>

                      <h6
                        className="card-title text- fs-5"
                        style={{ width: "18rem" }}
                      >
                        by:{review.createdBy.userName}
                      </h6>


                
                      {/* <NavLink
                        to={`/ProductDetails/${product._id}`}
                        className=" w-50 p-1 btn btn-secondary"
                      >
                        more Details...
                      </NavLink> */}
                      {/* <div><button onClick={()=>addToCart(product._id)}>add to cart</button></div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

 </div>
    </div>

    
    
    
    </>
    )
}
else {
  return <Loader/>
}
}

export default ProductDetails