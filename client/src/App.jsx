import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Errorpage from "./pages/Errorpage"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    {/* private route */}
    
    <Route element={<PrivateRoute/>}>

    <Route path="/profile" element={<Profile/>}/>
    <Route path="/createlisting" element={<CreateListing/>}/>
    </Route>

    <Route path="*" element={<Errorpage/>}/>

  </Routes>
  </BrowserRouter>
  )
}
  