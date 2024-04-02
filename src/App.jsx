import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import ProductsForCategory from "./pages/ProductsForCategory/ProductsForCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import UserContextProvider from "./Context/User";
import SendCode from "./pages/SendCode/SendCode";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import NotProtectedRoutes from "./components/ProtectedRoutes/NotProtectedRoutes";
import SubCategories from "./pages/SubCategories/SubCategories";
import SpecificCategory from "./pages/SpecificCategory/SpecificCategory";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Orders from "./pages/Orders/Orders";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Categories",
          element: <Categories />,
        },
        {
          path: "/Login",
          element: (<NotProtectedRoutes>
            <Login />
          </NotProtectedRoutes>
          ),
        },
        {
          path: "/Register",
          element: (
           <NotProtectedRoutes>
             <Register />
           </NotProtectedRoutes>
             
          ),
        },
        {
          path: "/Cart",

          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/Products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/ProductsForCategory/:categoryId",
          element: <ProductsForCategory />,
        },
      
        {
          path: "/SendCode",
          element: <SendCode />,
        },
        {
          path: "/ForgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/SubCategories/:subCategoryId",
          element: <SubCategories />,
        },

        {
          path: "/SpecificCategory/:categoryId",
          element: <SpecificCategory />,
        },

        {
          path: "/Profile",
          element: <Profile />,
         children:[
          {
            path: "/Profile/About",
            element: <About />,
          },
          {
            path: "/Profile/Contact",
            element: <Contact />,
          },
          {
            path: "/Profile/Orders",
            element: <Orders />,
          },
         ]
        },

        {
          path: "/Order",
          element: <Order />,
        },

        {
          path: "/ProductDetails/:productId",
          element: <ProductDetails />,
        },
        {
          path: "*",
          element: (
            <NotFound>
              <div className="errorMsg">
                <span>404</span>
                <span>Page Not Found</span>
                <span>Please Check The Address And Try Again</span>
              </div>
            </NotFound>
          ),
        },
      ],
    },
  ]);

  return (
    <>
    
     <UserContextProvider>
     <RouterProvider router={router} />
     </UserContextProvider>
     <ToastContainer/>
    </>
  );
}

export default App;
