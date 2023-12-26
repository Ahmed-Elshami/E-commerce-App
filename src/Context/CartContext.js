import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let CartContext=createContext();



let userToken= localStorage.getItem("userToken")
let headers={
    token:userToken
}





 function addToCard(id){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {productId:id},
    {headers:headers}
    ).then((response)=> response)
    .catch((error)=> error)
}

function getLoggedUserCart(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((response)=> response)
    .catch((error)=> error)
}

function removeCartItem(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {headers:headers}
    ).then((response)=>response)
    .catch((error)=>error)
}

function updateProductQuantity(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {count:count},
    {headers:headers}
    ).then((response)=>response)
    .catch((error)=>error)
}

function clearUserCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {headers:headers}
    ).then((response)=>response)
    .catch((error)=>error)
}

function onlinePayment(cartId,url,values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {shippingAddress:values},
    {headers:headers},
    ).then((response)=>response)
    .catch((error)=>error)
}

function cashPayment(cartId,values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {shippingAddress:values},
    {headers:headers},
    ).then((response)=>response)
    .catch((error)=>error)
}






export default function CartContextProvider(props) {
    const [cartNum, setcartNum] = useState(0);
    const [cartId, setcartId] = useState(null);
    const [orderId, setOrderId] = useState(null);

    async function getCartId(){
       let {data} = await getLoggedUserCart();
       setcartId(data?.data._id);
    }

    useEffect(()=>{
        getCartId();
    },[])


 return <CartContext.Provider value={{addToCard ,getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart,onlinePayment,cartId,setcartNum,cartNum,setOrderId,orderId,cashPayment}}>
    {props.children}
 </CartContext.Provider>

}
