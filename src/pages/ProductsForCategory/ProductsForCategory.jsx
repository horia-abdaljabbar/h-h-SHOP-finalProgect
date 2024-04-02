import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductsForCategories.css";
import { Bounce, Slide, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

function ProductsForCategory() {
  const { categoryId } = useParams();
  let [products, setProducts] = useState([]);
  let [showMoreLink, setShowMoreLink] = useState(false);
  let [loader, setLoader] = useState(false);
  const [rating,setRating]=useState([]);

  const getCategories = async () => {
    setLoader(true);
  try{
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/category/${categoryId}`
    );
    setProducts(data.products);
    console.log(data.products);
        setLoader(false);
setRating(data.products.avgRating);

  }
  catch(error)
  {
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
  useEffect(() => {
    getCategories();
  }, []);
  const showMore = () => {
    setShowMoreLink(!showMoreLink);
  };
 if(products.length>0 && loader==false){
  return (
    <>
      <div className="container">
      <div className="d-flex justify-content-evenly gap-5  flex-wrap">
          {products.map((product) => (
            <div key={product._id}>
              <div className="col  d-flex">
                <div className="card shadow p-3 bg-body rounded position-relative" style={{ width: "22rem" }}>
                {(product.discount!=0?<div className="discount d-flex justify-content-center  align-items-center position-absolute">
                      SALE
                    </div>:'')}
                  <img
                    src={product.mainImage.secure_url}
                    className="card-img-top shadow p-3 mb-5 bg-body rounded"
                    alt="product-img"
                  />
                  <div className="card-body d-flex flex-column gap-3">
                    <h5
                      className="card-title text- fs-5"
                      style={{ width: "18rem" }}
                    >
                      {product.name}
                    </h5>
                    <div className='d-flex '>
{(Math.ceil(product.avgRating)==1)?<img className='star' src="/star.svg"></img>: (Math.ceil(product.avgRating)==2)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:(product.avgRating==3)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(Math.ceil(product.avgRating)==4)?<><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>
:(Math.ceil(product.avgRating)==5)?<><img  className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img><img className='star' src="/star.svg"></img></>:''}
  </div>
                    

                    {product.discount == 0 ? (
                      <div className="d-flex justify-content-end align-items-center gap-2 ">
                        <span className="finalPrice">
                          {product.finalPrice}$
                        </span>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end align-items-center gap-2 ">
                        <span className="price">{product.price}$</span>
                        <span className="finalPrice">
                          {product.finalPrice}$
                        </span>
                      </div>
                    )}
                    <NavLink to={`/ProductDetails/${product._id}`} className=' w-50 p-1 btn btn-secondary'>more Details...</NavLink>
                    {/* <div><button onClick={()=>addToCart(product._id)}>add to cart</button></div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
 }

 else if(products.length ==0 && loader ==false){
  return (
    <>
    <div className="container " >
     <div className=" d-flex flex-column gap-4">
       <h4 className=" col-12 text-center mt-5">no products for this category</h4>
      <Link to='/Categories' className="mb-5 col-12"><img src="/arrow.svg" className="arrowIcon" ></img>Continue Shopping</Link>
     </div>
    </div>
    </>
  )
 }
 else {
  return <Loader/>
 }
}

export default ProductsForCategory;
