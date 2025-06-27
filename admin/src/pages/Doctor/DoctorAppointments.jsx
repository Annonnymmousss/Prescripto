import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const {appointments,getAppointments,dtoken , completeAppointment , cancelAppointment} = useContext(DoctorContext)
  const {calculateAge , currency} = useContext(AppContext)
  useEffect(()=>{
    if(dtoken){
      getAppointments()
    }
  },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item,index)=>(
            
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b text-gray-500 hover:bg-gray-50 border-gray-200 ' key={index}>
              <p>{index+1}</p>
              <div className='flex items-center gap-2 '>
                <img className='w-8 rounded-full' src={item.userData.image}/><p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-indigo-500 px-2 rounded-full'>{item.payment?'Online' :'CASH'}</p>
              </div>
                <p>{calculateAge(item.userData.dob)}</p>
                <p>{item.slotDate},{item.slotTime}</p>
                <p>{currency}{item.amount}</p>
                {
                  item.cancelled
                  ?<p className='text-xs font-medium text-red-700'>Cancelled</p>
                  :item.isComplete
                  ?<p className='text-xs font-medium text-green-500'>Completed</p>
                  :<div className='flex'>
                  <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
                }
                
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments
