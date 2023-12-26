import React, { useContext, useEffect } from 'react'
import style from './Products.module.css'
import { getProducts } from '../../Redux/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function Products() {

 let {loading,isError,products}= useSelector((state)=> state.product);
 
  let dispatcg=useDispatch();
   useEffect(()=>{
  dispatcg(getProducts())
  },[])


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

 
  return (
    <>
   {/* <button onClick={()=> refetch()}  className='btn bg-main w-100'>hii</button> */}
    {loading?

      <div className="loading">
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
    {products.map((product)=>
    
       
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

