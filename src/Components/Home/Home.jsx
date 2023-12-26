import React, { useContext } from 'react'
import style from './Home.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from '../categorySlider/categorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'
import Footer from '../Footer/Footer'



export default function Home() {
  
  return (
    <>

            <Helmet>
                
                <title>FreshCart | Ahmed Elshamy</title>
            </Helmet> 



      <MainSlider/>
      <CategorySlider/>
      <FeaturedProducts/>
      <Footer/>

    </>
  )
}

