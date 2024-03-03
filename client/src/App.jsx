import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Sign from "./pages/Sign"
import Signout from "./pages/Signout"
import Profile from "./pages/Profile"
import Errorpage from "./pages/Errorpage"
import Header from "./components/Header"

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/sign-in" element={<Sign/>}/>
    <Route path="/sign-out" element={<Signout/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="*" element={<Errorpage/>}/>

  </Routes>
  </BrowserRouter>
  )
}
  