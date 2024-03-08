import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";   
import { app } from "../firebase.js";
import {updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserStart} from "../redux/user/userSlice.js"
import {useDispatch} from 'react-redux'
export default function Profile() {
  const { currentUser ,loading , error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setfile] = useState(undefined);
  const [FormData, setFormData] = useState({});
  const [fileper, setfileper] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [update,setupdate]= useState(false)

  const dispatch= useDispatch()

   
  // /ffffffffffffffffff
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("upload is " + progress+" % done")
        setfileper(Math.round(progress));
        setFileUploadError(false);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, avatar: downloadURL })
        );
      }
    );
  };
 
  const handleChange= (e)=>{
         setFormData({...FormData,[e.target.id]:e.target.value})   
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
     const res= await fetch(`/api/user/update/${currentUser._id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(FormData),
     })
     const data= await res.json();
      if(data.success==false){
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setupdate(true)



    }catch(error) 
    {dispatch(updateUserFailure(error.message))}
  }

  const handleDeleteUser=async()=>{
    try{
     dispatch(deleteUserStart());
     const res= await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'
     });
     const data= res.json();
     if(data.success=== false){  
      dispatch(deleteUserFailure(data.message))
      return
     }
     dispatch(deleteUserSuccess(data))
    }catch(error){
 dispatch(deleteUserFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-center text-3xl font-semibold">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col  gap-3" >
        <input
          type="file"
          ref={fileref} 
          hidden
          accept="image/*"
          onChange={(e) => setfile(e.target.files[0])}
        />
        <img
          src={FormData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover cursor-pointer 
       self-center m-auto mt-3"
          onClick={() => fileref.current.click()}
        />
        <p className="text-sm  p-1 flex items-center justify-center">
          {fileUploadError ? (
            <span className="text-red-700">Error image upload</span>
          ) : fileper > 0 && fileper < 100 ? (
            <span>{`uplaoding ${fileper} %`}</span>
          ) : fileper === 100 ? (
            <span className="text-green-700">Image Upload Successsfully </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          className="border p-3
        rounded-lg w-full"
          defaultValue={currentUser.username}
          id="username"   onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3
        rounded-lg w-full"
          id="email" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3
        rounded-lg w-full"
          id="password" onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <button disabled={loading}
          className="w-full p-3 rounded-lg uppercase 
        hover:opacity-95 disabled:opacity-80 bg-slate-700
         text-white"
        >
         {loading ?"Loading...":"update"}
        </button>

        <div className="flex justify-between mt-5">
          <span className="text-red-800 cursor-pointer font-semibold " onClick={handleDeleteUser}>
            Delete account
          </span>
          <span className="text-red-800 cursor-pointer font-semibold ">
            Sign out
          </span>
        </div>
        <p className="text-red-700">{error?error:""}</p>
        <p className="text-green-700">{update?"user updated Succesfully ":""}</p>
      </form>
    </div>
  );
}
