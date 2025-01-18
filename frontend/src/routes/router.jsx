import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cartpage from "../pages/products/Cartpage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import PrivateRoute from "./PrivateRoute";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <div>Orders</div>,
        },
        {
            path: "/about",
            element: <h1>About</h1>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/cart",
          element: <Cartpage/>,
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>,
        },
        {
          path: "/products/:id",
          element: <SingleProduct/>,
        }
      ]
    },
  ]);

  export default router;