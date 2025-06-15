import React, { useContext, useState } from "react";

import {assets} from "../assets/assets 2"

import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
const Navbar = () => {

    const  [showMenu , setshowMenu] = useState(false);
    const {token , settoken , userData}  = useContext(AppContext)

    const logout = () => {
        settoken(false)
        localStorage.removeItem('token')
        toast.success("Logout successfully")
    }

    const navigate = useNavigate()
  return (
    <div className="flex item-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400 ">
        <img className="w-44 cursor-pointer"src={assets.logo}/>
        <ul className="hidden md:flex items-start gap-5 font-medium mt-3 ">
            <NavLink to={'/'}>
                <li className="'py-1">HOME</li>
                <hr className="border-none outline-none h-0.5 bg-voilet w-3/5 m-auto hidden"/>
            </NavLink>
            <NavLink to={'/doctors'}>
                <li className="'py-1">ALL DOCTORS</li>
                <hr className="border-none outline-none h-0.5 bg-voilet w-3/5 m-auto hidden"/>
            </NavLink>
            <NavLink to={'/about'}>
                <li className="'py-1">ABOUT</li>
                <hr className="border-none outline-none h-0.5 bg-voilet w-3/5 m-auto hidden"/>
            </NavLink>
            <NavLink to={'/contact'}>
                <li className="'py-1">CONTACT</li>
                <hr className="border-none outline-none h-0.5 bg-voilet w-3/5 m-auto hidden"/>
            </NavLink>
        </ul>
        <div className="flex item-center gap-4">
            {
                token && userData
                ?<div className="flex item-center gap-2 curson-pointer group relative">
                    <img className="w-8 rounded-full"src={userData.image}/>
                    <img className="w-2.5"src={assets.dropdown_icon}/>
                    <div className="absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block">
                        <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                            <p onClick={()=>navigate("my-profile")}className="hover:text-black cursor-pointer">My Profile</p>
                            <p onClick={()=>navigate("my-appointments")}className="hover:text-black cursor-pointer">My Appointments</p>
                            <p onClick={()=>logout()}className="hover:text-black cursor-pointer">Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('login')} className="bg-indigo-500 text-white px-8 py-3 rounded-full font-light hidden md:block">Create Account</button>
            }
            
        </div>
    </div>
  )
}

export default Navbar
