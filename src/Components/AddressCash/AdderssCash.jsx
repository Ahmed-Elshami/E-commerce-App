import React, { useContext } from 'react'
import {  useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'



export default function AddressCash() {

  let {cashPayment,cartId}=useContext(CartContext)

    async function handleAddressSbmit(values){
      let response= await cashPayment(cartId,values);
      console.log(response);
      if(response.data.status == 'success'){
        toast.success("Your request has been completed successfully",
        {
          duration:2500,
         position: 'top-center'
        })
        }
        else{
        toast.error('Your request was not successful',
        {
          duration:2500,
         position: 'top-center'
        })
      }
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
