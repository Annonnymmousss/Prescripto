import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const SideBar = () => {

const {atoken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white-border'>
      {
        atoken && <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-500':''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon}/>
            <p>Dashbord</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-500':''}`} to={'/all-appointments'}>
            <img src={assets.appointment_icon}/>
            <p>Appointments</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-500':''}`} to={'/add-doctor'}>
            <img src={assets.add_icon}/>
            <p>Add Doctor</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-500':''}`} to={'/doctor-list'}>
            <img src={assets.people_icon}/>
            <p>Doctors List</p>
          </NavLink>
        
        </ul>
      }
    </div>
  )
}

export default SideBar
