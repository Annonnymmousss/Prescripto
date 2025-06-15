import React from 'react'
import {specialityData} from "../assets/assets 2"
import { Link } from 'react-router-dom'


const SpecialityMenu = () => {
  return (
    <div className='flex flex-col gap-4 py-16 items-center text-gray-800'id='speciality'>
         <h1 className='text-3xl font-medium'>Find By Speciality</h1>
         <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum lorelor nisi pariatur tempora delectus odit repudiandae. Errorbfcksdbfvadjvajviuagviugugsiufiufiugiuasgig, iure?</p>
         <div className='flex items-center gap-4 pt-5 w-full overflow-scroll sm:justify-center'>
            {specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0,0)} className='flex flex-col itmes-center text-xs ursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' key={index} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image}/>
                    <p>{item.speciality}</p>
                </Link>
            ))}

         </div>
    </div>
  )
}
export default SpecialityMenu
