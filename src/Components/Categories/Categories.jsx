import React, { useEffect } from 'react'
import style from './Categories.module.css'
import { BallTriangle } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriy } from '../../Redux/CategorySlice'



export default function Categories() {

let {categoriy,loading,isError}=  useSelector((state)=> state.category)

let dispatch=useDispatch();

useEffect(()=>{
  dispatch(getCategoriy())
},[])

console.log(categoriy);

  return (
    <>

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
      <div className="row my-5">
        {categoriy.map((categorie,index)=>
         <div key={index} className="col-md-2">
         <div className="categorie">
           <img className='w-100'height={250} src={categorie.image} alt='categoriesimg'/>
           <h4 className='h6 text-main mt-2 mb-5 text-center'>{categorie.name}</h4>
         </div>
       </div>
        
        )}
       
      </div>

  }



    </>
  )
}

