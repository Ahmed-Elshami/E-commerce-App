import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { LineWave } from 'react-loader-spinner'
import { Link } from 'react-router-dom';


export default function Cart() {

  let{getLoggedUserCart,removeCartItem,updateProductQuantity,clearUserCart,setcartNum,setOrderId} =useContext(CartContext);

 let [cartDetails, setCartDetails] = useState(null);

 async function getCart(){
   let {data}= await getLoggedUserCart();
   setcartNum(data?.numOfCartItems);
   setOrderId(data?.data.cartOwner)
   setCartDetails(data);
  }

  async function RemoveItem(id){
    let {data}= await removeCartItem(id);
    setcartNum(data?.numOfCartItems);
    setCartDetails(data);
    if(data.status === 'success'){
      toast.success("Removed Item Successfully",
      {
        duration:1500,
       position: 'top-center'
      }
      )
      
    }else{
      toast.error('Error! Removed Item Successfully',
      {
        duration:1500,
       position: 'top-center'
      }
      )
    }
  }

  async function updateCount(id,count){
  let {data}= await  updateProductQuantity(id,count)
  setCartDetails(data);
  if(data.status === 'success'){
    toast.success("successfully done",
    {
      duration:1500,
     position: 'top-center'
    }
    )
    
  }else{
    toast.error('Error !! Not successfully',
    {
      duration:1500,
     position: 'top-center'
    }
    )
  }}

  
  async function deleteCart(){
  let {data}= await clearUserCart()
  setcartNum(data?.numOfCartItems);
  setCartDetails(null);
  if(data.message == 'success'){
    toast.success("Delete Cart Successful",
    {
      duration:1800,
     position: 'top-center'
    })
    }
    else{
    toast.error('Error! Not Delete Cart Successful',
    {
      duration:1500,
     position: 'top-center'
    })
  }
}




  useEffect(()=>{
    getCart();
  },[]);


  return (
    <>
    {cartDetails?
       <div className="w-75 m-auto my-3 p-3 bg-main-light ">
       <h3>Shop Cart  </h3>
       <h4 className=' h6 text-main fw-bolder'>Total Items : {cartDetails.numOfCartItems}  </h4>
       <h4 className=' h6 text-main fw-bolder mb-4 '>Total Cart Price : {cartDetails.data.totalCartPrice}  EGP  </h4>

        {cartDetails.data.products.map((product,index)=> 
        <div key={index} className="row border-bottom  py-2 px-2">
            
          <div className="col-md-1">
            <img className='w-100 ' src={product.product.imageCover} alt={product.product.title}/>
          </div>

          <div className="col-md-11 mt-1 ">
            <div className="d-flex justify-content-between align-aitems-center">
              <div>
                <h3 className='h6'>{product.product.title}</h3>
                <h6 className='text-main'>Price : {product.price} EGP</h6>
              </div>
              <div className='mt-3 hoverrl' >
                  <button onClick={()=> updateCount(product.product.id,product.count + 1)} className='btn brdr-main-rl p-1'>+</button>
                  <span className='mx-2'>{product.count}</span>
                  <button onClick={()=> updateCount(product.product.id,product.count - 1)} className='btn brdr-main-rl p-1'>-</button>
              </div>
              
            </div>
              <div className="btnn-hover">
              <button onClick={()=> RemoveItem(product.product.id)}  className='btn p-0 font-sm brdr-main p-1 brdr-hover'><i className= 'text-danger font-sm fas fa-trash-can'></i> Remove</button>
              </div>

          </div>
            
        </div>)}

          <div  className="text-center"  >
             <Link to={"/address"}   className='btn bg-main text-white w-50 rounded  btn-sm mt-2'>Online Payment</Link>
          </div>
          <div className="text-center">
            <Link to={"/addresscash"}   className='btn bg-main text-white w-50 rounded  btn-sm mt-2'>Cash On Delivery</Link>
          </div>
          {/* clear cart */}
        <div className="text-center">
            <button   onClick={()=>deleteCart()}  className='btn bg-danger text-white w-50 rounded  btn-sm mt-2'>Clear Cart</button>
        </div>
     </div>
     
    :<section id='loading' className='d-flex justify-content-between align-aitems-center'>
          <div className="w-100  py-5 m-auto d-flex align-items-center justify-content-center">
          <LineWave
          height="250"
          width="250"
          color="#4fa94d"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
      </section>
    }
   
    </>
  )
}

