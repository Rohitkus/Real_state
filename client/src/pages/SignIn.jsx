import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import  { useDispatch, useSelector } from 'react-redux'
import {signInStart,signInFailure,signInsuccess} from '../redux/user/userSlice.js'
 
export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading , error }= useSelector((state)=>state.user)
  const navigate= useNavigate()
  const dispatch=useDispatch()
    
 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
 
 const handlesubmit= async (e)=>{
  e.preventDefault();
  try{ 
    
   dispatch(signInStart())
     const res = await fetch('/api/auth/signin', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       }, 
       body: JSON.stringify(formData),
     });
     const data= await res.json()
     console.log(data)
     if(data.success === false){
    dispatch(signInFailure(data.message))
       return
     }
     dispatch(signInsuccess(data))
     navigate('/')

  }  catch(error){
    dispatch(signInFailure(error.message))
  }

 }
 
  return (
    <div className='p-5 max-w-lg mx-auto'>
   <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
   
   <form  className='flex flex-col gap-5' onSubmit={handlesubmit} >
   

    <input type="email" className='border p-3 rounded-lg' 
     placeholder='Email' id='email' onChange={handleChange} required  />

    <input type="password"  className='border p-3 rounded-lg'
      placeholder='Password' id="password" onChange={handleChange} required />
      <button disabled={loading} className='bg-slate-700 text-white p-3 
      rounded-lg uppercase hover:opacity-90'>
        {loading?"Loading...":"Sign in"}
      </button>
   </form>
   <div className='flex gap-4 mt-5'>
    <p>Dont have an account?</p>
   
      <Link to={"/sign-up"}>
        <span className='text-blue-700'>Sign up</span>
      </Link>
   </div>

   {error && <p className='text-red-600 mt-5'> {error}</p>}
    </div>
  )
}
