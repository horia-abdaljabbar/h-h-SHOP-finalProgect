import React from 'react'
import { Navigation,  A11y,Autoplay } from 'swiper/modules';
import { useState ,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import  './SwiperCategories.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Loader from "../../components/Loader/Loader";
import axios from 'axios';

function SwiperCategories() {
  let [categories,setcategories]=useState([]);
  let [loader, setLoader] = useState(false);

  
  const getCatagories=async ()=>{
      try{
        setLoader(true);

        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
      setcategories(data.categories);
      console.log(data.categories);
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
      getCatagories();
  },[]);

if(!loader) {
  return (
    <>
    <div className='container'>
    <h4 className='sectionTitle'>featured categories...</h4>

    </div>
   <Swiper
      // install Swiper modules
      modules={[Navigation, A11y ,Autoplay]}
      spaceBetween={10}
      slidesPerView={5}
      // navigation
      loop={true}
      autoplay={{
          delay: 2000,
          disableOnInteraction: false
      }}
      breakpoints={{
        // when window width is >= 576px
            576: {
              slidesPerView: 2,
            },
        // when window width is >= 768px
            768: {
              slidesPerView: 3,
            },
        // when window width is >= 1024px
            1024: {
            
              slidesPerView: 4,
            },
            1280: {
             
              slidesPerView: 5,
            },
          }}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
               {categories.map((category) => (
        <SwiperSlide className='d-flex flex-column justify-content-center align-items-center ' key={category.id}>
          <img  className='w-75'
            src={category.image.secure_url}
            alt={category.name}
          />
          {/* <NavLink to={`/ProductsForCategory/${category.id}`} className='btn btn-light align-self-end border border-warning'>more</NavLink> */}
        </SwiperSlide>
      ))}

    </Swiper>
    </>
  )
}
else {
  return <Loader/>
}
}

export default SwiperCategories