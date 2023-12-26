import React from 'react'
import style from './categorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from "react-slick";

export default function CategorySlider() {

  // slick slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,

  };

function getCategorySlider(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

  let {isLoading,isError, isFetched, data}=useQuery("CategorySlider", getCategorySlider)
  console.log(data);
  return (
   <>
   
    <div className="py-4">

    {data?.data.data? <Slider {...settings}>
    {data?.data.data.map((category)=>
    <img key={category._id} height={200} className='w-100' src={category.image} />
    ) }
    </Slider> :''}
    </div>
  
    
    
   </>
  )
}

