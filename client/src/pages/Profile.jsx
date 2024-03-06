import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser}= useSelector((state)=>state.user)
  return (
    <div className="p-3 max-w-lg m-auto">
    <h1 className='text-center text-3xl font-semibold'>Profile</h1>
     
     <form>
      <img src={currentUser.avatar} alt="profile"
       className="rounded-full w-24 h-24 object-cover cursor-pointer 
       self-center m-auto mt-3"  />
       <input type="text" placeholder="Username"  className="border p-3
        rounded-lg w-full" id="username"/>
        <input type="email" placeholder="Email"  className="border p-3
        rounded-lg w-full" id="email"/>
        <input type="password" placeholder="Password"  className="border p-3
        rounded-lg w-full" id="password"/>
        <button className="w-full p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 bg-slate-700
         text-white">Update</button>

         <div className="flex justify-between mt-5">
          <span className="text-red-800 cursor-pointer font-semibold ">Delete Account</span> 
          <span className="text-red-800 cursor-pointer font-semibold ">Sign Out</span> 

         </div>
     </form>
    </div>
  )
}
