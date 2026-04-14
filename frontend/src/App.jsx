import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/HeroPage/Home";
import { Footer } from "./components/Footer/Footer";
import { Text } from "./components/Layout/Text";
import { Button } from "./components/Layout/Button";
import { Signup } from "./pages/SignUp/signup";
import { Login } from "./pages/Login/login";


const Main = () => {
  return <div className="min-h-screen bg-[#f6f9f6] flex flex-col ">
      <Navbar/>
      <Outlet />
      <Footer />
  </div>
}


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} >
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
























export default App;