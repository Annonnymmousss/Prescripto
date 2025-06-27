import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const {atoken , dashData , cancelAppointment , getDashData} = useContext(AdminContext)
  useEffect(()=>{
    if(atoken){
      getDashData()
    }
  },[atoken])
  return dashData &&(
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon}/>
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.appointments_icon}/>
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.patients_icon}/>
          <div>
            <p>{dashData.users}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon}/>
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item,index)=>(
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}> 
                <img className='rounded-full w-10' src={item.docData.image}/>
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{item.slotDate}</p>
                </div>
                {item.cancelled
                ?<p className='text-red-700 text-xs font-medium'>Cancelled</p>
                : <img onClick={()=>cancelAppointment(item._id)} className='w-10 curson-pointer' src={assets.cancel_icon}/>}
              </div> 
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
