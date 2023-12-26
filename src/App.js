import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Notfound from './Components/Notfound/Notfound'

import { UserContext } from './Context/UserContext'
import ProtectedRoute from './Components/protectedRoute/protectedRoute'
import ProductDetails from './Components/productDetails/productDetails'
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './Context/CartContext'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Address from './Components/Address/Address'
import Orders from './Components/Orders/Orders'
import AddressCash from './Components/AddressCash/AdderssCash'








let routers=createHashRouter([
  {path:'/', element:<Layout/> , children:[
    {index:true, element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path:'brands', element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:'cart', element:<ProtectedRoute> <Cart/> </ProtectedRoute> },
    {path:'categories', element:<ProtectedRoute> <Categories/> </ProtectedRoute>  },
    {path:'Products', element:<ProtectedRoute><Products/> </ProtectedRoute>},
    {path:'productDetails/:id', element:<ProtectedRoute><ProductDetails/> </ProtectedRoute>},
    {path:'address', element:<ProtectedRoute><Address/> </ProtectedRoute>},
    {path:'addresscash', element:<ProtectedRoute><AddressCash/> </ProtectedRoute>},

    {path:'allorders', element:<ProtectedRoute><Orders/> </ProtectedRoute>},

    {path:'login', element:<Login/> },
    {path:'register', element:<Register/>},
    {path:'*', element:<Notfound/>}
  ] }
])

export default function App() {

  let {setuserToken}= useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      setuserToken(localStorage.getItem("userToken"))
    }
  },[])
 


  return <CartContextProvider>
            <Provider store={store}>
              <RouterProvider router={routers}></RouterProvider>
            </Provider>
           <Toaster />
          </CartContextProvider>

  
  
 
      
   
    
   
  
}
