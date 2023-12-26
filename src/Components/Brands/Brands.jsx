import React, { useEffect } from 'react'
import style from './Brands.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/brandSlice';



export default function Brands() {
 

 let {brands,loading,isError}= useSelector((state)=> state.brands);

 let dispatch= useDispatch();
 useEffect(()=>{
    dispatch(getBrands())
 },[])

  return (
    <>
      
    </>
    
    
  )
}

