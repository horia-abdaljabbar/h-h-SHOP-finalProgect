import React, { useEffect, useState } from "react";
import SwiperCategories from "../../components/SwiperCategories/SwiperCategories";
import Hero from "../../components/Hero/Hero";
import "./Home.css";
import DetailsHome from "../../components/DetailsHome/DetailsHome";

function Home() {
  let [backGroundImg, setbackGroundImg] = useState("");

  return (
    <>
    <div className="all d-flex justify-content-center mt-5 mb-5">
    <div>
    <h1 className="text-secondary ">welcome to <span className="shop fw-bolder">H-H-Shop</span></h1><span className="text-dark d-flex justify-content-end pe-5">you find here everything you want</span>

    </div>
    </div>
      <DetailsHome />
      <SwiperCategories />
    </>
  );
}

export default Home;
