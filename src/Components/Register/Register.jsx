import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {Dna} from  'react-loader-spinner'




export default function Register() {

  let navigate=useNavigate();
  let [erro, seterro] = useState(null)
  let [isloading, setisloading] = useState(false)

  async function submitRegister(values){
    setisloading(true);
   let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .catch((error)=> {
    setisloading(false);
    seterro(error.response.data.message)
  })

   if(data.message=="success"){
    setisloading(false);
    navigate("/login")
   }
  }

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema=Yup.object({
    name:Yup.string().min(3, "name min length is 3").max(20,"name max length is 20").required("name is required"),
    email:Yup.string().email("email invalid").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"email is invalid").required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/ , "phone is invalid").required("phone is required"),
    password:Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "The password must contain letters, special characters, and numbers. You have {6-16} valid.").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"password and rePassword They don't match").required("repassword is required")
  })

  let formik=useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:'',
    }, validationSchema:validationSchema,

    onSubmit:submitRegister
  })


  return (
    <>
      <div className='w-75 m-auto mt-5'>
        <h2>Register</h2>

        {erro ?<div className="alert alert-danger mt-3 p-2">{erro}</div>:""}

        <form onSubmit={formik.handleSubmit}>
          <label  className='mt-2'>name</label>
          <input className='form-control' type='text' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.name && formik.touched.name ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.name}</div>:''}
          
          <label  className='mt-2'>phone</label>
          <input className='form-control' type='tel' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.phone && formik.touched.phone ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.phone}</div>:''}

          
          <label className='mt-2'>email</label>
          <input className='form-control' type='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.email && formik.touched.email ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.email}</div>:''}

          
          <label className='mt-2'>password</label>
          <input className='form-control' type='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.password && formik.touched.password ? <div className="alert mt-2 p-2 alert-danger">{formik.errors.password}</div>:''}

          
          <label className='mt-2'>repassword</label>
          <input className='form-control' type='password' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.rePassword && formik.touched.rePassword? <div className="alert mt-2 p-2 alert-danger">{formik.errors.rePassword}</div>:''}

          {isloading==true?<button type='button' className='btn bg-white border 3px solid bg-main text-white mt-2'>
          <Dna
                visible={true}
                height="40"
                width="60"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
          </button>
          :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}
          <Link className='btn mt-2 text-main ' to={"/login"}>Login</Link>

        </form>
        
      </div>
    </>
  )
}

