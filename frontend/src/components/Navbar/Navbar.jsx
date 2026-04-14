import { useState } from "react";
import { Layout } from "../Layout/Layout";
import { Logo } from "./Logo";
import { LinkComp } from "./Linkcomp";
import HomeImg from "../../assets/home.png";
import CloseImg from "../../assets/close.png"
import SidebarImg from "../../assets/menu.png"
import { Link } from "react-router-dom";


export const Navbar = () => {

  const [open,setOpen] = useState(false);

  return <div className="w-full h-14 md:h-16 bg-white border-b fixed z-50">
    <Layout className={`flex h-full items-center justify-between`}>

      {/* Logo */}
      <div className="flex gap-4 items-center">
        {!open ?
        <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(!open)}>
          <Logo src={SidebarImg} className={"h-5 w-5 font-bold"}/>
        </button>
        </div>: <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)}>
            <Logo src={CloseImg} className={"h-5 w-5 font-bold"}/>
          </button>
        </div> }
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <p className="font-serif md:text-2xl text-xl font-semibold tracking-tight text-Green-500 cursor-pointer ">
              Avantara Stays
            </p>
          </Link>
          <Logo src={HomeImg} className="h-5 w-5" />
        </div>
      </div>

     
      <div className=" hidden md:flex gap-6 items-center">
        <LinkComp to={"/home"} variant={"text"}>Home</LinkComp>
        <LinkComp to={"/stays"} variant={"text"}>Stays</LinkComp>
        <LinkComp to={"/about"} variant={"text"}>About</LinkComp>
        <LinkComp to={"/contact"} variant={"text"}>Contact</LinkComp>
        <LinkComp variant={"button"} onClick={()=>console.log("Hii")} value={"signup"} size={"large"}>Signup</LinkComp> 
        <LinkComp variant={"button"} onClick={()=>console.log("Hii")} value={"login"} size={"large"}>Login</LinkComp> 
      </div>

      <div className="md:hidden ">
        <LinkComp variant={"button"} onClick={()=>console.log("Hii")} value={"login"} size={"large"}>Login</LinkComp> 
      </div>
    </Layout>

    <div
      className={`md:hidden fixed py-10 top-14 left-0 w-full bg-White-100 border-t
      transform transition-transform duration-300 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <Layout className="py-8">
        <div className="flex flex-col gap-5  items-center  ">
          <LinkComp to={"/home"} variant={"text"} className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0  delay-100":" opacity-0 -translate-x-5"}`}>Home</LinkComp>
          <LinkComp to={"/stays"} variant={"text"} className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0  delay-200":" opacity-0 -translate-x-5"}`}>Stays</LinkComp>
          <LinkComp to={"/about"} variant={"text"} className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0  delay-300":" opacity-0 -translate-x-5"}`}>About</LinkComp>
          <LinkComp to={"/contact"} variant={"text"} className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0  delay-400":" opacity-0 -translate-x-5"}`}>Contact</LinkComp>
          <LinkComp to={"/signup"} variant={"text"} className={`transition-all duration-300 ${open ? "opacity-100 translate-x-0  delay-500":" opacity-0 -translate-x-5"}`}>Signup</LinkComp>
          </div>
      </Layout>
    </div>
  </div>
}