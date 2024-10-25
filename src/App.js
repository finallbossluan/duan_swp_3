import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Sidebar from './pages/Sidebar';
function App() {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(null); // Initial state can be null or empty
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
        return  dataApi.data
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }
  const fetchUserCreateOrder = async()=>{
    const dataResponse = await fetch(SummaryApi.createOrder.url,{
      method : SummaryApi.createOrder.method,
      credentials : 'include'
    })

    const data = await dataResponse.json();

    if (data.success) {
      // Assuming the user ID is returned in the data
      setUserId(data.userId);
    }
  }


  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()
    fetchUserCreateOrder()


  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
          fetchUserCreateOrder
      }}>
      <ToastContainer position="top-center" />
        <Header />
        <div className="app-layout">
          <Sidebar /> 
        
          <main className="main-content min-h-[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
