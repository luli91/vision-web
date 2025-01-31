import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Cartpage from "../pages/products/CartPage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/products/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashBoardLAyout";
import Dashboard from "../pages/dashboard/DashBoard";
import ManageProducts from "../pages/dashboard/manageProducts/ManageProducts";
import AddProduct from "../pages/dashboard/addProduct/AddProduct";
import UpdateProduct from "../pages/dashboard/EditProduct/UpdateProduct";
import FavoritePage from "../pages/products/FavoritePage";
import ProductsPage from "../pages/products/ProductsPage";
import SearchResultsPage from "../pages/products/SearchResultPage";
import Account from "../pages/account/Account";
import ResetPassword from "../pages/account/ResetPassword";
import MyPurchasesPage from "../pages/myPurchases/MyPurchasesPage";

  
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
            path: "/favorites",
            element: <FavoritePage/>
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
        {
          path: "/productos", 
          element: <ProductsPage/>,
        },
        {
          path: "/productos/:category",
          element: <ProductsPage/>,
        },
        {
          path: "/productos/search", 
          element: <SearchResultsPage/>,
        },
        {
          path: "/account", 
          element: <PrivateRoute><Account/></PrivateRoute>,
        },
        {
          path: "/reset-password", 
          element: <ResetPassword/>,
        },
        {
          path: "/my-purchases", 
          element: <PrivateRoute><MyPurchasesPage/></PrivateRoute>,
        }
      ]
    },
    {
      path:"/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute><DashboardLayout/></AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-product",
          element: <AdminRoute><AddProduct/></AdminRoute>
        },
        {
          path: "edit-product/:id",
          element: <AdminRoute><UpdateProduct/></AdminRoute>
        },
        {
          path: "manage-products",
          element: <AdminRoute><ManageProducts/></AdminRoute>
        }
      ]
    }
  ]);

  export default router;