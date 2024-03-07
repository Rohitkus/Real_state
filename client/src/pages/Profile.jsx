import { useSelector } from "react-redux"
import { useRef, useState ,useEffect} from "react"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {app} from '../firebase.js'

export default function Profile() {
  const {currentUser}= useSelector((state)=>state.user)
  const fileref= useRef(null)
  const [file,setfile]=useState(undefined)
  const [FormData,setFormData]=useState({})
  const [fileper,setfileper]= useState(0)
  const [fileUploadError,setFileUploadError]= useState(false)
  console.log(FormData)

  
  console.log(fileper) 
  console.log(fileUploadError)
// /ffffffffffffffffff
useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
},[file])
const handleFileUpload=(file)=>{ 
   const storage= getStorage(app)
   const fileName= new Date().getTime()+file.name;
   const storageRef= ref(storage,fileName);
   const uploadTask = uploadBytesResumable(storageRef,file)
  

   uploadTask.on('state_changed', 
   (snapshot)=>{
    const progress = (snapshot.bytesTransferred /
    snapshot.totalBytes)*100;
    // console.log("upload is " + progress+" % done")
    setfileper(Math.round(progress))
    setFileUploadError(false)
   },
   (error)=>{
     setFileUploadError(true)
    
   },
   ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setFormData({...FormData,avatar:downloadURL}))
   }
   );
} 

  return (
    <div className="p-3 max-w-lg m-auto">
    <h1 className='text-center text-3xl font-semibold'>Profile</h1>
     
     <form>
      <input type="file" ref={fileref} hidden accept='image/*'
      onChange={(e)=>setfile(e.target.files[0])} />
      <img src={FormData.avatar || currentUser.avatar} alt="profile"
       className="rounded-full w-24 h-24 object-cover cursor-pointer 
       self-center m-auto mt-3"  onClick={()=> fileref.current.click()} />
    <p className="text-sm  p-1 flex items-center justify-center">{fileUploadError ?(
    <span className="text-red-700">Error image upload</span>
    ):fileper > 0 && fileper< 100 ?( <span>{`uplaoding ${fileper} %`}</span>):fileper===100 ?( 
    <span className="text-green-700">Image Upload Successsfully </span> ):('')
     
   
      
      }</p>


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
          <span className="text-red-800 cursor-pointer font-semibold ">Delete account</span> 
          <span className="text-red-800 cursor-pointer font-semibold ">Sign out</span> 

         </div>
     </form>
    </div>
  )
}
