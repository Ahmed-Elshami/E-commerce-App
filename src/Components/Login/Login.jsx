import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import {  useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {BallTriangle } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'



export default function Login() {
  //  user context جزء خاص ب التوكن والربط مع 

  let {setuserToken,setuserData}=useContext(UserContext)

// كدا عملت سيت للتوكن من هنا يروح setuserToken(data.token) وبعدين عملت سيت تحت بعد سكسسيس
//  علشان يكون متشاف في كل مكان في المشروع userContext لل 

  // ///////////////////////////////////////
 let navigate=useNavigate();
 let [erro, seterro] = useState(null);
 let [isloading, setisloading] = useState(false)

  async function login(values){
    setisloading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((error)=>{
      setisloading(false);
      seterro(error.response.data.message)
    })

    if(data.message=='success'){
      setisloading(false);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", data.user.name);
      setuserToken(data.token);
      setuserData(data.user);
      navigate('/')
    }
  }


  let validationSchema=Yup.object({
    email:Yup.string().email("email is invalid").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,"email is invalid").required("email is required"),
    password:Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "The password must contain letters, special characters, and numbers. You have {6-16} valid.").required("password is required"),
  })

let formik= useFormik({
  initialValues:{
    email:'',
    password:''
  }, validationSchema,
  onSubmit:login
})


  return (
    <>
        <div className='w-75 m-auto mt-5'>
        
        <h2>Login</h2>

        {erro?<div className="alert alert-danger p-2">{erro}</div>:''}
        
        <form onSubmit={formik.handleSubmit}>
          <label className='mt-3'>Email</label>
          <input className='form-control' type='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.email && formik.touched.email ?<div className="alert alert-danger p-2">{formik.errors.email}</div>:''}
          
          <label className='mt-3'>Password</label>
          <input className='form-control' name='password' type='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
          {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2">{formik.errors.password}</div>:''}

          {isloading== true ?
          <button type='button' className='btn bg-white border 3px solid bg-main text-white mt-2 '>
         <BallTriangle
            height={20}
            width={50}
            radius={8}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
          </button>:
            <>
            <div className="d-flex align-items-center mt-3">
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white  mx-2'>Login</button> 
              <Link className='btn text-main ' to={"/Register"}>Register Now</Link>
            </div>
            </>
          }
          
        </form>
        
      </div>
    </>
  )
}

