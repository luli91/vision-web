import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cartpage from "../pages/products/Cartpage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/products/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
  
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
            element: <PrivateRoute><OrderPage/></PrivateRoute>,
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
        },
      ]
    },
    {
      path:"/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute><div>Admin Dashboard</div></AdminRoute>,
      chidren: [
        {
          path: "",
          element: <AdminRoute><div>Dashboard Home</div></AdminRoute>
        },
        {
          path: "add-new-product",
          element: <AdminRoute><div>Add new product</div></AdminRoute>
        },
        {
          path: "edit-product/:id",
          element: <AdminRoute><div>Edit product</div></AdminRoute>
        },
        {
          path: "manage-products",
          element: <AdminRoute><div>Manage product</div></AdminRoute>
        }
      ]
    }
  ]);

  export default router;