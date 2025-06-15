import React from 'react'
import { assets } from '../assets/assets 2'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-indigo-500 rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col item-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointments <br/> With Trusted Doctors 
            </p>
            <div className='flex flex-col md:flex-row item-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles}/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br className='hidden sm:block'/>Necessitatibus laboriosam error maxime velit asperiores! </p>
            </div>
            <a href='#speciality' className='flex item-center gap-2 bg-white px-8 py-3 rounded-full text-grey-600 text-sm m-auto md:m hover:scale-105 transition-all duration-300'>
                Book Appointments <img className='w-3'src={assets.arrow_icon}/>
            </a>
        </div>
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg'src={assets.header_img}/>
        </div>
    </div>
  )
}

export default Header
