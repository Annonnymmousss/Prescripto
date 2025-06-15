import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets 2'

const Doctors = () => {
    const {speciality} = useParams()
    const {doctors} = useContext(AppContext)
    const [FilterDoc , setFilterDoc] = useState([])
    const navigate = useNavigate()
    const ApplyFilter=()=>{
        if(speciality){
            setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
        }else{
            setFilterDoc(doctors)
        }
    }

    useEffect(()=>{
        ApplyFilter()
    },[doctors,speciality])
  return (
    <div>
         <p className='text-gray-600'>Browse Through the doctors speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>      
        <div className='flex flex-col gap-4 text-gray-600 text-sm'>
            <p onClick={()=> speciality==='General Physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='General physician' ?'bg-indigo-200 text-black' : ''}`}>General Physician</p>
            <p onClick={()=> speciality==='Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gynecologist' ?'bg-indigo-200 text-black' : ''}`}>Gynecologist</p>
            <p onClick={()=> speciality==='Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Dermatologist' ?'bg-indigo-200 text-black' : ''}`}>Dermatologist</p>
            <p onClick={()=> speciality==='Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Pediatricians' ?'bg-indigo-200 text-black' : ''}`}>Pediatricians</p>
            <p onClick={()=> speciality==='Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Neurologist' ?'bg-indigo-200 text-black' : ''}`}>Neurologist</p>
            <p onClick={()=> speciality==='Gasteroenterologist' ? navigate('/doctors') : navigate('/doctors/Gasteroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==='Gasteroenterologist' ?'bg-indigo-200 text-black' : ''}`}>Gasteroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-4 gap-4 gap-y-6'>
            {
                FilterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                        <img className='bg-blue-50' src={item.image}/>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Doctors
