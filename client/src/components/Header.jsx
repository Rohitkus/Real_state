import {useEffect, useState}from "react";
import {FaSearch} from "react-icons/fa"
import {Link,useNavigate} from "react-router-dom"
import {  useSelector } from "react-redux";

export default function Header() {
  const [searchTerm,setSearchTerm]= useState('')
  console.log(searchTerm)
  const nevigate= useNavigate();
const {currentUser}= useSelector(state=>state.user)

const handleSubmit=(e)=>{
  e.preventDefault();
  const  urlParams = new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm)
  const seatchQuery=  urlParams.toString();
  nevigate(`/search?${seatchQuery}`)
}

useEffect(()=>{
  const urlParams= new URLSearchParams(location.search);
  const searchTermFormUrl= urlParams.get('searchTerm');
  if(searchTermFormUrl){
    setSearchTerm(searchTermFormUrl)
  }
},[location.search])
  return (
    <header className="bg-slate-300 shadow-md ">
      <div className="flex justify-between  items-center max-w-6xl m-auto p-1   ">
        {/* logo */}
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap justify-center item-center">
          <span className="text-slate-500">Rohit</span>
          <span className="text-slate-5800">Estate</span>
        </h1></Link>
        {/* search */}
        <form onSubmit={handleSubmit} className="bg-slate-100 rounded-lg p-2 flex  justify-center   items-center   ">
          <input type="text" placeholder="Search... " value={searchTerm}  className="bg-transparent focus:outline-none w-24 sm:w-48 " 
  
             onChange={(e)=>setSearchTerm(e.target.value)} />
             <button >

          <FaSearch className="text-slate-600" />
             </button>
        </form>
        {/* nav links */}
        <ul className="flex gap-5 justify-center items-center  text-slate-700">
            <Link to="/">
            <li className="hidden md:inline hover:underline">Home</li></Link>
            <Link to="/about"> <li className="hidden md:inline hover:underline">About</li></Link>
            
            <Link to="/profile">
              {currentUser ? (
                <img className="rounded-full h-8 w-8 object-cover" src={currentUser.avatar} alt='profile' />
              ):( <li className=" hover:underline">Sign in</li>)

              }
            </Link>
        </ul>

      </div>
    </header>
  );
}
