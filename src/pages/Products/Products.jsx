import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import { Bounce, Slide, toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";

function Products() {
  let [products, setProducts] = useState([]);

  const token = localStorage.getItem("userToken");
  let [showMoreLink, setShowMoreLink] = useState(false);
  let [loader, setLoader] = useState(false);

  let [numOfPages, setNumOfPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [totalNums, setTotalNums] = useState([]);
  let [searchValue, setSearchValue] = useState('');
  let [sortValue,setSortValue]=useState('');
  let [displayValue,setDisplayValue]=useState(3)


    let [errors,setErrors]=useState('');
    let [msg,setMsg]=useState('');

    const navigate = useNavigate();
    let [currentproducts,setCurrentProducts]=useState([]);


  let numbers = [];
  console.log("num", numOfPages);

  const getProducts = async () => {
    if(displayValue==2 &&currentPage==1){

      setNumOfPages(4);
  
    
  } if(displayValue==3 &&currentPage==1)
  {
  
    setNumOfPages(3);
  
  }
  
  else if(displayValue==4 && currentPage==1)
  {
  
    setNumOfPages(2);
  
   
  }

   if((sortValue == 'name' || sortValue=='finalPrice' || sortValue=='discount') ){
    setLoader(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/?page=${currentPage}&limit=${displayValue}&sort=${sortValue}`
      );

      setProducts(data.products);
      console.log("data after sorting",data.products);

      if (totalNums.length == 0) {
        setTotalNums([1,2,3]);
      } else {
        setNumOfPages(Math.ceil(data.total / parseInt(displayValue)));
      }
  
      setCurrentProducts(data.products.slice(0,parseInt(displayValue)));
  
      for (let i = 1; i <= numOfPages; i++) {
        numbers.push(i);
        console.log("num", numbers);
        setTotalNums(numbers);
      }     
       setLoader(false);
    } catch (error) {
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
   }

    if( displayValue){
    setLoader(true);

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/?page=${currentPage}&limit=${displayValue}`
      );

      setProducts(data.products);
      console.log("data after sorting",data.products);

setNumOfPages(Math.ceil(data.total / parseInt(displayValue)));

      
  
      setCurrentProducts(data.products.slice(0,parseInt(displayValue)));
  
      for (let i = 1; i <= numOfPages; i++) {
        numbers.push(i);
        console.log("num", numbers);
        setTotalNums(numbers);
      }     
       setLoader(false);
    } catch (error) {
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
   }

  //  else  if( displayValue ==3){
  //   setLoader(true);

  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/products/?page=${currentPage}&limit=3&sort=${sortValue}`
  //     );

  //     setProducts(data.products);
  //     console.log("data after sorting",data.products);

  //     if (totalNums.length == 0) {
  //       setTotalNums([1,2,3]);
  //     } else {
  //       setNumOfPages(Math.ceil(data.total / parseInt(3)));
  //     }
  
  //     setCurrentProducts(data.products.slice(0,parseInt(3)));
  
  //     for (let i = 1; i <= numOfPages; i++) {
  //       numbers.push(i);
  //       console.log("num", numbers);
  //       setTotalNums(numbers);
  //     }     
  //      setLoader(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoader(false);
  //     toast.error(error.response.data.message, {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Slide,
  //     });
  //   }
  //  }


  //  if(displayValue !=3 && sortValue==''){
  //   setSortValue('');
  //   setLoader(true);

  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/products/?page=${currentPage}&limit=${displayValue}&sort=${sortValue}`
  //     );

  //     setProducts(data.products);
  //     console.log("data after sorting",data.products);

  //     // if (totalNums.length == 0) {
  //     //   setTotalNums([1,2,3]);
  //     // } else {
  //       setNumOfPages(Math.ceil(data.total / parseInt(displayValue)));
  //    // }
  
  //     setCurrentProducts(data.products.slice(0,parseInt(displayValue)));
  
  //     for (let i = 1; i <= numOfPages; i++) {
  //       numbers.push(i);
  //       console.log("num", numbers);
  //       setTotalNums(numbers);
  //     }     
  //      setLoader(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoader(false);
  //     toast.error(error.response.data.message, {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Slide,
  //     });
  //   }
  //  }
  


// if(resultClicked==true)
// {
//     setLoader(true);
//      setSortValue('');
//      try{
//        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=3&price[gte]=${userRange.min}&price[lte]=${userRange.max}`);
//        console.log(data);
      
//       setProducts(data.products);
//         console.log("data after min max",data.products);
//         if (totalNums.length == 0) {
//           setTotalNums([1,2,3]);
//         } else {
//           setNumOfPages(Math.ceil(data.total / parseInt(displayValue)));
//         }
    
//         setCurrentProducts(data.products.slice(0,parseInt(displayValue)));
    
//         for (let i = 1; i <= numOfPages; i++) {
//           numbers.push(i);
//           console.log("num", numbers);
//           setTotalNums(numbers);
//         }
//        setLoader(false);
   
//    //     if (data.message === "success") {
//    //      setMsg("tha data is ready...");
//    //       if(currentPage==1)
//    // setMsg('');
//    //       } 
         
      
//      }
   
//      catch(error){
//        console.log(error);
//        setLoader(false);
//        toast.error(error.response.data.message, {
//          position: "top-center",
//          autoClose: 2000,
//          hideProgressBar: false,
//          closeOnClick: true,
//          pauseOnHover: true,
//          draggable: true,
//          progress: undefined,
//          theme: "dark",
//          transition: Slide,
//         });
//            }
//    }






  };
  useEffect(() => {
    getProducts();
  }, [currentPage,displayValue,sortValue]);
  const showMore = () => {
    setShowMoreLink(!showMoreLink);
  };

  const addToCart = async (id) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      console.log(data.message);
      if (data.message === "success") {
        setLoader(true);
        toast.success("tha product added successfully", {
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
    } catch (error) {
      setLoader(false);

      console.log("error", error.response.data.message);
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

  const handleSearch=async(e)=>{
    console.log(e.target.value);
setSearchValue(e.target.value);
setDisplayValue(3);
  try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/?search=${searchValue}`
      );
      setErrors('no products matches what you want');

      setProducts(data.products);
      console.log("data after sorting",data.products);

      if (totalNums.length == 0 &&currentPage==1 && displayValue==3) {
        setTotalNums([1]);
      } else {
        setNumOfPages(Math.ceil(data.total / parseInt(displayValue)));
      }
  
      setCurrentProducts(data.products.slice(0,parseInt(displayValue)));
  
      for (let i = 1; i <= numOfPages; i++) {
        numbers.push(i);
        console.log("num", numbers);
        setTotalNums(numbers);
      }     
       setLoader(false);


      setLoader(false);
    } catch (error) {
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
  }


  const handleSort=async(e)=>{
    if(e.target.value==1){
      setSortValue('name');

    }

    else if(e.target.value==2){
      setSortValue('finalPrice');

    }

    else if(e.target.value==3){
      setSortValue('discount');
    }

console.log("sort",sortValue);

 
  }

  const handleDisplay=async(e)=>{
    setDisplayValue(e.target.value);

console.log("display",parseInt(e.target.value));
}
// const handleForm=(async(e)=>{
//   e.preventDefault();
//   console.log(userRange.min);
//   setResultClicked(true);
//   console.log(resultClicked);
// });

// const handleRange=(async(e)=>{
// e.preventDefault();
// const { name, value } = e.target;
// setUserRange({ ...userRange, [name]: value });

//   })

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  useEffect(() => {
    handleSort();
  }, [sortValue,currentPage]);

  useEffect(() => {
    handleDisplay();
  }, [displayValue,currentPage]);
  // useEffect(() => {
  //   handleRange();
  // }, [userRange,currentPage]);

  useEffect(() => {
setSortValue('') ;

}, [currentPage==1]);

  if (!loader) {
    return (
      <>
          <div className="container">

          {(currentPage==1?<>

            <nav className="extraNav d-flex justify-content-between align-items-center">
            <select
              className="form-select form-select-sm "
              aria-label="Small select example" name="userValue"
             value={sortValue} onChange={handleSort}>
              <option selected>sort by </option>
              <option value={1}>name</option>
              <option value={2}>finalPrice</option>
              <option value={3}>discount</option>
            </select>

            <input
              type="text"
              className="search mb-4 "
              //   value={user.email}
              name="coupon"
              //  onChange={handleInput}
              placeholder="search..."
              onChange={handleSearch}
              value={searchValue}
            />
          </nav> 
          <nav className="extraNav d-flex justify-content-between align-items-center  ">
            
            <div className="d-flex flex-column justify-content-center align-items-center ">
              <label>display the products...</label>
  <input type='text' value={displayValue} onChange={handleDisplay}/>
 </div>

 
 {/* <form className="d-flex flex-column justify-content-between align-items-center   gap-2" onSubmit={handleForm}>
  <input type='text' name='min' value={userRange.min} onChange={handleRange}/>
 <input type='text' onChange={handleRange} name='max' value={userRange.max}/>
  
<button className="submitBtn pt-1 pb-1">result</button>

 </form> */}
            </nav>
          </>
          
          :'' )}

          <div className="text-center mb-2 ">
          <span className=" text-success f-5 display-6 ">{msg}</span>

          </div>
          <div className="d-flex justify-content-evenly gap-5  flex-wrap">
            {products.map((product) => (
              <div key={product._id}>
                <div className="col  d-flex">
                  <div
                    className="card shadow p-3 bg-body rounded position-relative"
                    style={{ width: "22rem" }}
                  >
                    {product.discount != 0 ? (
                      <div className="discount d-flex justify-content-center  align-items-center position-absolute">
                        SALE
                      </div>
                    ) : (
                      ""
                    )}
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

                      {product.discount == 0 ? (
                        <div className="d-flex flex-row flex-wrap-nowrap justify-content-end align-items-center gap-2 ">
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
                      
                      <NavLink
                        to={`/ProductDetails/${product._id}`}
                        className=" w-50 p-1 btn btn-secondary"
                      >
                        more Details...
                      </NavLink>
                      {/* <div><button onClick={()=>addToCart(product._id)}>add to cart</button></div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <h2 className="m-auto">ooops...{errors}</h2> */}

        <nav aria-label="..." className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            {currentPage == 1 ? (
              <li className="page-item ">
                <button className="page-link" disabled="disabled">
                  previous
                </button>
              </li>
            ) : (
              <li className="page-item">
                <button
                  className="page-link "
                  onClick={() => {setCurrentPage(currentPage - 1); setMsg('')}}
                >
                  previous
                </button>
              </li>
            )}
            {totalNums.map((currentP) => (
              <li className="page-item" key={currentP}>
                <button
                  className={`page-link ${(currentPage==currentP)?'active':''}`}
                  onClick={() => setCurrentPage(currentP)}
                >
                  {currentP}
                </button>
              </li>
            ))}
            {currentPage === numOfPages ? (
              <li className="page-item">
                <button className="page-link" disabled="disabled">
                  next
                </button>
              </li>
            ) : (
              <li className="page-item">
                <button
                  className="page-link "
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </>
    );
  } else {
    return <Loader />;
  }
}

export default Products;
