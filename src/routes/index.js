import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Payment from '../pages/Payment'
import AllOrders from '../pages/AllOrders'
import AllNews from '../pages/AllNew'
import News from '../pages/News'
import NewsDetails from '../components/NewsDetails'
import UserPanel from '../pages/UserPanel'
import ChangePassword from '../components/ChangePassword'
import LoginSuccess from '../pages/LoginSuccess'
import ResetPassword from '../pages/ResetPassword'
import AllDiscount from '../pages/All-Discount'
import SupportCustomer from '../components/Support'
import AllReview from '../pages/AllReview'
const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path: "reset-password/:id/:token",
                element: <ResetPassword />
            },
            {
                path: "login-success/:id",
                element: <LoginSuccess />
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path: "all-orders",
                        element : <AllOrders/>
                    },
                    {
                        path: "AllNews",
                        element : <AllNews/>
                    },
                    {
                        path : "discount",
                        element : <AllDiscount/>
                    },
                    {
                        path: 'all-review',
                        element: <AllReview />
                    }
                ]
            },
            {
                path: "user-panel",
                element : <UserPanel/>,
            },
            {
                path : "change-password",
                element: <ChangePassword/>,
            },
            {
                path : "payment",
                element : <Payment/>
            },
            {
                path : "news",
                element : <News/>
            },
            {
                path : "news/:id",
                element : <NewsDetails/>
            },
            {
                path: 'SupportCustomer',
                element: <SupportCustomer />
            }
       
        ]
    }
])


export default router