import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {


  
  
  let {cartNum}=  useContext(CartContext);
 let {userToken, setuserToken, userData}=  useContext(UserContext);
 
  let navigate= useNavigate();

 function Logout(){
  localStorage.removeItem('userToken');
  setuserToken(null);
  navigate("/login");
 }

  return (


    
   <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh market logo"/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken !==null?
        <>
          <li className="nav-item">
          <Link className="nav-link"to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li> */}
        <li className="nav-item position-relative">
          <Link className="nav-link " to="cart">Cart</Link>
          
 
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
           {cartNum}
          </span>
        </li>
        
        </> :""
        }
        
      </ul>




      <ul className="navbar-nav ms-auto  mb-lg-0">
      
        <li className="nav-item me-3  d-flex justify-contenet-center align-items-center">
          
            <i className='fab fa-facebook mx-2'></i>
            <i className='fab fa-twitter mx-2'></i>
            <i className='fab fa-instagram mx-2'></i>
            <i className='fab fa-youtube mx-2'></i>
        </li>
        

        {userToken!==null?
        <>
          <li className="nav-item">
        <span onClick={()=>Logout()}  className="span1 nav-link cursor-pointer">Log out</span>
        </li>

        {/* <li className="nav-item d-flex justify-contenet-center align-items-center">
          <span className='text-main'>wellcome {userData?.name}</span>
        </li> */}
        </>
        
        

        :
        <>
          <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
         </li>
          <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
        </>
        }

        
        
      </ul>
    
    </div>
  </div>
</nav>
   </>
  )
}

