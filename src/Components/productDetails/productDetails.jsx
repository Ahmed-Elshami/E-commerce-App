import React, { useContext } from 'react'
import style from './productDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";
import { Triangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function ProductDetails() {


   // add to card
let {addToCard}=useContext(CartContext);

async function addProductToCard(id){
let response = await addToCard(id)
if(response.data.status === 'success'){
  toast.success('products successfully added',
  {
    duration:1500,
    position: 'top-center'
  })
 
}else{
  toast.error(' error,,, products not successfully added')
}
}



  let params= useParams()

// slick slider
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

  function getproductDetails(id){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

 let {isLoading, data}=useQuery("productDetails", ()=>getproductDetails(params.id) )
  console.log(data?.data.data);
  


  return (
   <>

    
    {isLoading?

      <div className="w-100  py-5  d-flex align-items-center justify-content-center">
         
          <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
          />
      </div>
  
      :
    
      <div className="row mt-5 d-flex align-items-center justify-content-center">
          <div className='col-md-4'>
            {data?.data.data.images ?<Slider {...settings}>
              {data?.data.data.images.map((img,index)=> {return <img key={index} src={img} className='w-100'/>})}
            </Slider> :''}
          </div>

          <Helmet>
                
                <title>{data?.data.data.title}</title>
          </Helmet> 



          <div className='col-md-8'>
            <h2 className='h5'>{data?.data.data?.title}</h2>
            <p className={style.p}>{data?.data.data?.description}</p>
            <h6>{data?.data.data?.category.name}</h6>
            <div className=" d-flex justify-content-between">
              <h6>{data?.data.data?.price} EGY</h6>
              <h6><i className='fas fa-star rating-color'></i> {data?.data.data?.ratingsAverage} </h6>
            </div>
            <button onClick={()=>addProductToCard(data?.data.data?.id)} className='btn bg-main text-white btn-sm w-100 mt-2'>+ add to card</button>

          </div>
      </div>
  }

    
   </>
  )
}

