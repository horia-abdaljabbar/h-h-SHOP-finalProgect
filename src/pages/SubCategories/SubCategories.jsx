import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
function SubCategories() {
    const { subCategoryId } = useParams();
    console.log(subCategoryId);
    const [subCategories,setSubCategories]=useState([]);
    const getCategories=async()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/${subCategoryId}/subcategory`);
       // setSubCategories(data.categories);
        console.log(data);
      
    }
    
    
      useEffect(()=>{
        getCategories();
    
      },[]);
    
  return (
    <div>SubCategories</div>
  )
}

export default SubCategories