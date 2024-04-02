import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { NavLink } from 'react-router-dom';
function SpecificCategory() {
    const token=localStorage.getItem('userToken');
    const { categoryId } = useParams();

    const [category,setCategory]=useState([]);
    const [image,setImage]=useState([]);

    const getCategory=async()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/${categoryId}` ,
        {
headers:{
  Authorization:`Tariq__${token}`
}
        });
        setCategory(data.category);
        setImage(data.category.image);
      
    }
    
    
      useEffect(()=>{
        getCategory();
    
      },[]);
    
  return (
    <>
<div className="container">
        <div className="d-flex justify-content-center gap-5  flex-wrap">
              <div className="col align-self-stretch d-flex justify-content-center">
                <div
                  className="card align-self-stretch shadow p-3 mb-5 bg-body rounded"
                  style={{ width: "25rem" }}
                >
                   <img
                    src={image.secure_url}
                    className="card-img-top shadow p-3 mb-5 bg-body rounded"
                    alt="category-img"
                  />
                 
                  
                  <div className="card-body d-flex flex-column gap-3">
                    <h5
                      className="card-title text-wrap"
                      style={{ width: "19rem" }}
                    >
                      {category.name}
                    </h5>

                    {/* <NavLink to={`/SpecificCategory/${category._id}`}>more details</NavLink> */}

                  </div>
                </div>
              </div>
        </div>
      </div>
    </>
  )
}

export default SpecificCategory



