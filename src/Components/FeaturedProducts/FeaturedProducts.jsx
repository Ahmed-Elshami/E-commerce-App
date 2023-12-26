import React, { useContext } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../Context/CartContext'

export default function FeaturedProducts() {
  
 // add to card
let {addToCard,setcartNum}=useContext(CartContext);

  async function addProductToCard(id){
  let response = await addToCard(id)
  setcartNum(response.data.numOfCartItems)
  if(response.data.status === 'success'){
    toast.success('products successfully added',
    {
      duration:1500,
      position: 'top-center'
    });
   

   
  }else{
    toast.error(' error,,, products not successfully added')
  }
}

// /////////





  function getFeaturedProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let {isLoading, data , isError,isFetching}=useQuery(" Featured Products", getFeaturedProducts, {
    // cacheTime:3000,
    // staleTime:30000,
    // refetchInterval:5000,
    // enabled:false
  } )
  




  return (
   <>
   {/* <button onClick={()=> refetch()}  className='btn bg-main w-100'>hii</button> */}
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
     
   <div className=" py-2">
    <div className="row">
    {data?.data.data.map((product)=>
    
       
        <div key={product.id} className="col-md-2">
         
            <div className="product cursor-pointer py-3 px-2">
            <Link to={`/productDetails/${product.id}`} >
              <img className='w-100' src={product.imageCover} alt={product.title}/>
              <span className='text-main font-sm fw-bolder' >{product.category.name}</span>
              <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
              <div className="d-flex justify-content-between mt-3">
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
              </div>
            </Link>
            <button onClick={()=>addProductToCard(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>add to cart</button>

            </div>
         

        </div>
        
       )}
    </div>
   </div>



    }

  
    
    
   </>
  )
}

