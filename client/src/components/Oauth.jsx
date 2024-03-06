import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import {  useDispatch } from 'react-redux'
import { signInsuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'


export default function Oauth() {
  const dispatch = useDispatch()
  const navigate= useNavigate()
const handleGooleClick= async () => {
    try{
         const provider = new GoogleAuthProvider()
         const auth = getAuth(app)
         const result =await signInWithPopup(auth,provider)
//  console.log(result)
     const res = await fetch("/api/auth/google",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:result.user.displayName, 
        email:result.user.email,
        photo:result.user.photoURL
      })
     })
     const data= await res.json()
     console.log(data);
     dispatch(signInsuccess(data))
navigate("/")

    }catch(error){
       console.log("could not sign in with google" ,error)
    }
}

  return (
    <button onClick={handleGooleClick} type="button" className="text-center bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
      Sign-in With Google
    </button>
  )
}
