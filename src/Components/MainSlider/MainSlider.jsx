import React from 'react'
import style from './MainSlider.module.css'
import slide1 from '../../assets/images/slider-image-3.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-1.jpeg'
import blog1 from '../../assets/images/blog-img-1.jpeg'
import blog2 from '../../assets/images/blog-img-2.jpeg'

import Slider from "react-slick";

export default function MainSlider() {
    // slick slider
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true,
      arrows:false
    };
  return (
   <>
    <div className="row my-3 gx-0">
      <div className="col-md-8 ">
      <Slider {...settings}>
        <img className='w-100' height={400} src={slide1}  alt='photo'/>
        <img className='w-100' height={400} src={slide2}  alt='photo'/>
        <img className='w-100' height={400} src={slide3}  alt='photo'/>
      
        </Slider>
      </div>
      <div className="col-md-4">
      <img className='w-100' height={200}  src={blog1}  alt='photo'/>
      <img className='w-100'height={200} src={blog2}  alt='photo'/>

      </div>
    </div>
   </>
  )
}

