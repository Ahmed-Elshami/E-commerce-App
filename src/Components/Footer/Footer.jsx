import React from 'react'
import style from './Footer.module.css'
export default function Fotter() {
  return (
   <>
    <>
    
    <div className="row">
        <div className="col-md-12 ">
          <div className={`${style.footer}  container-fluid`}>
            <h3>Get The Fresh Cart App</h3>
            <p className='h6 my-3'>We Will Send You A Link, Open It On Your Phone To Download The App</p>
            <div className="mt-3 ms-3 d-flex">
            <input className='form-control w-75'  name='footer' type='text' placeholder='Email' />
            <button className='btn bg-main ms-5  text-white'>Share App Link</button>

            </div>
          </div>
        </div>
      </div>
    
    
    </>
   </>
  )
}

