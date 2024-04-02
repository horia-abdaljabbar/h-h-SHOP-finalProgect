import React, { useEffect, useState } from 'react'
import './Categories.css'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Bounce, Slide, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";



function Categories() {
  const token=localStorage.getItem('userToken');
  const [categories,setCategories]=useState([]);
  let [loader, setLoader] = useState(false);

const getCategories=async()=>{
  setLoader(true);
    try{
      const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`,

    
    {
      headers:{
        Authorization:`Tariq__${token}`
      }

    });
    setCategories(data.categories);
    console.log(categories);
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

    }
  
}


  useEffect(()=>{
    getCategories();

  },[]);

if(!loader){
  return (
    <>

    <div className="container mt-5">
            <div className="d-flex justify-content-between gap-5  flex-wrap">
              {categories.map((category) => (
                <div key={category._id}>
                  <div className="col align-self-stretch d-flex">
                    <div
                      className="card align-self-stretch shadow p-3 mb-5 bg-body rounded"
                      style={{ width: "25rem" }}
                    >
                      <img
                        src={category.image.secure_url}
                        className="card-img-top shadow p-3 mb-5 bg-body rounded"
                        alt="category-img"
                      />
                      <div className="card-body d-flex flex-column gap-3">
                        <h4
                          className="card-title text-wrap"
                          style={{ width: "19rem" }}
                        >
                          {category.name}
                        </h4>
    
                        {/* {category.subcategory.map((sub)=>
    <div key={sub._id}>
    <NavLink to={`/SubCategoy/${sub._id}`}>more related categories..</NavLink>
    </div>
    
                        )} */}
                        {/* <NavLink to={`/SpecificCategory/${category._id}`}>more details</NavLink> */}
                        <NavLink to={`/ProductsForCategory/${category.id}`} className='submitBtn'>more...</NavLink>
    
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </>
    )
}

else {
  return <Loader/>
}
}

export default Categories