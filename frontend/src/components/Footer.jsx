import React from 'react'
import { assets } from '../assets/assets 2'

const Footer = () => {
  return (
      <div className='md:mx-10'>
          <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
              <div>
                <img className='mb-5 w-40' src={assets.logo}/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis consequuntur, similique blanditiis accusamus repellat rem ipsum natus inventore distinctio corrupti amet, nostrum nisi expedita! Tenetur non deleniti sed dolor repudiandae!</p>
              </div>
              <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
              </div>
              <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+69-6969696969</li>
                    <li>gwgdwgd@gmail.com</li>
                </ul>
              </div>
          </div>
      </div>
  )
}

export default Footer
