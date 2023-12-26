import React, { useContext} from 'react'
import style from './Orders.module.css'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'



export default function Orders() {

let {orderId}= useContext(CartContext);
//console.log(orderId);


function getOrdersUser(Id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/655a877374e96bc5037f03d7`)
}

let {isLoading, data , isError,isFetching}=useQuery("OrdersUser", ()=>getOrdersUser(orderId))

 
  return (
   <>

   {isLoading?
      <div className="w-100  py-5 m-auto d-flex align-items-center justify-content-center">
      <BallTriangle
        height={80}
        width={80}
        radius={8}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
   
  
  :
  <div className="row w-75 m-auto my-3 p-3 bg-main-light">
   <h2 className='text-main fw-bolder'>Ordres</h2>

   
   {data?.data.map((product,index)=>
      <div key={index} className="col-md-3 my-3">
      <img className='w-100 mb-3' height={250} src={product.cartItems[0].product.imageCover} alt='' />
      <h3 className='h6 text-main fw-bolder'> name : {product.cartItems[0].product.category.name}</h3>
      <h3 className='h6 text-main fw-bolder'>Paid At : {product.paidAt}</h3>
      <h3 className='h6 text-main fw-bolder'>Total : {product.totalOrderPrice} EGY</h3>
      <h3 className='h6 text-main fw-bolder'>tax : {product.taxPrice}</h3>
      <h3 className='h6 text-main fw-bolder'>City : {product.shippingAddress.city}</h3>
      <h3 className='h6 text-main fw-bolder'>Phone : {product.shippingAddress.phone}</h3>
      </div>
    )}
   </div>
  
  
  }
   
   </>
  )
}

