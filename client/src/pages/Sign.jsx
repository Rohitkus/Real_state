import React from 'react'
import {Link} from 'react-router-dom'

export default function Sign() {
  return (
    <div className='p-5 max-w-lg mx-auto'>
   <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
   
   <form  className='flex flex-col gap-5' >
    <input type="text"  placeholder='username'
     className='border p-3 rounded-lg' id="username"/>

    <input type="email" className='border p-3 rounded-lg' 
     placeholder='Email' id='email' />

    <input type="password"  className='border p-3 rounded-lg'
      placeholder='Password' id="password"/>
      <button className='bg-slate-700 text-white p-3 
      rounded-lg uppercase hover:opacity-90'>Sign UP</button>
   </form>
   <div className='flex gap-4 mt-5'>
    <p>Have an account?</p>
   
      <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
   </div>
    </div>
  )
}
