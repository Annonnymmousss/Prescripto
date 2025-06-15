import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg , setdocImg] = useState(false)
    const [name , setname] = useState('')
    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')
    const [speciality , setspeciality] = useState('General Physician')
    const [fees , setfees] = useState('')
    const [about , setabout] = useState('')
    const [degree , setdegree] = useState('')
    const [experience , setexperience] = useState('1 Year')
    const [address1 , setaddress1] = useState('')
    const [address2 , setaddress2] = useState('')


    const {backendUrl , atoken} = useContext(AdminContext)

    const onSubmitHandler = async(event) => {
        event.preventDefault()

        try {
            if(!docImg){
                return toast.error("Image not selected")
            }

            const formData = new FormData()
            formData.append('name' , name )
            formData.append('email' , email )
            formData.append('speciality' , speciality )
            formData.append('fees' , Number(fees) )
            formData.append('address' , JSON.stringify({line1:address1,line2:address2}))
            formData.append('about' , about )
            formData.append('experience' , experience )
            formData.append('password' , password )
            formData.append('degree' , degree )
            formData.append('image' , docImg )
            formData.append('date' , Date.now())
            
            
            

            formData.forEach((value,key)=>{
                console.log(`${key}:${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor' , formData , {headers: {atoken}})

            console.log(data)
        


            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }

            console.log(atoken)

            setdocImg(false)
            setname('')
            setabout('')
            setaddress1('')
            setaddress2('')
            setdegree('')
            setemail('')
            setexperience('')
            setfees('')
            setpassword('')
            

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc_img'>
                <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg):assets.upload_area}/>
            </label>
            <input onChange={(e)=>setdocImg(e.target.files[0])} type='file' id='doc_img' hidden/>
            <p>Upload Doctor <br/> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Name</p>
                    <input onChange={(e)=>setname(e.target.value)} value={name} className='border rounded px-3 py-2 border-gray-400' type='text' placeholder='Name' required/>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Email</p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='border rounded px-3 py-2 border-gray-400' type='email' placeholder='Email' required/>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Password</p>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border rounded px-3 py-2 border-gray-400' type='password' placeholder='Password' required/>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Experience</p>
                    <select onChange={(e)=>setexperience(e.target.value)} value={experience} className='border rounded px-3 py-2 border-gray-400'>
                    <option value='1 Year'>1 Year</option>
                    <option value='2 Year'>2 Year</option>
                    <option value='3 Year'>3 Year</option>
                    <option value='4 Year'>4 Year</option>
                    <option value='5 Year'>5 Year</option>
                    <option value='6 Year'>6 Year</option>
                    <option value='7 Year'>7 Year</option>
                    <option value='8 Year'>8 Year</option>
                    <option value='9 Year'>9 Year</option>
                    <option value='10 Year'>10 Year</option>
                    </select>
                   
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Fee</p>
                    <input onChange={(e)=>setfees(e.target.value)} value={fees} className='border rounded px-3 py-2 border-gray-400' type='number' placeholder='Fees' required/>
                </div>

            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Speciality</p>
                    <select onChange={(e)=>setspeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 border-gray-400'>
                        <option value="General Physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gasteroenterologist">Gasteroenterologist</option>
                    </select>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Education</p>
                    <input onChange={(e)=>setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2 border-gray-400' type='text' placeholder='Education' required/>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <p>Address</p>
                    <input onChange={(e)=>setaddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 border-gray-400' type='text' placeholder='Address1' required/>
                    <input onChange={(e)=>setaddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 border-gray-400' type='text' placeholder='Address2'/>
                </div>
            </div>
         </div>
         <div>
            <p className='mt-4 mb-2'>About</p>
            <textarea onChange={(e)=>setabout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded border-gray-400 ' rows={5} placeholder='Write About Doctor' required/>
        </div>
        <button type='submit' className='bg-indigo-500 text-white rounded-full px-10 py-3 mt-4'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
