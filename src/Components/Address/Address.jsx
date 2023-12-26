import React, { useContext } from 'react'
import {  useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'


export default function Address() {

  let {onlinePayment,cartId}=useContext(CartContext)

    async function handleAddressSbmit(values){
      let response= await onlinePayment(cartId,'http://localhost:3000',values);
      console.log(response.data.session.url);
      window.location.href=response.data.session.url;
    }

    let formik=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:""
          },
          onSubmit:handleAddressSbmit
    })
  return (
    <>
          <form onSubmit={formik.handleSubmit}>
            <label className='mt-3'>Details</label>
            <input className='form-control' type='text' name='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} />

            <label className='mt-3'>Phone</label>
            <input className='form-control' type='tel' name='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            
            <label className='mt-3'>City</label>
            <input className='form-control' type='text' name='city' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />

              <button type='submit' className='btn bg-main text-white mt-4'>Pay Now</button>
          </form>
    </>
  )
}
