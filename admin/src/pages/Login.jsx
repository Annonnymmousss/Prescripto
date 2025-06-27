import React , {useState , useContext} from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'


const Login = () => {

    const{setatoken , backendUrl} = useContext(AdminContext)
    const{setdtoken} = useContext(DoctorContext)
    const [state,setstate] = useState("Admin")

    const [email , setemail] = useState('')
    const [password , setpassword] = useState('')

    const onSubmitHandler = async(event)=>{
        event.preventDefault()

        try {
            if(state==='Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login' , {email,password})
                if(data.success){
                    localStorage.setItem('atoken' , data.token)
                    setatoken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(backendUrl + '/api/doctor/login' , {email,password})
                if(data.success){
                    localStorage.setItem('dtoken' , data.token)
                    setdtoken(data.token)
                }else{
                    toast.error(data.message)
                }
                
            }


        } catch (error) {
            
        }
    }
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:w-96 border border-gray-200 rounded-xl text-zinc-600 text-sm shadow-lg'>
     <p className='text-2xl font-semibold m-auto'><span className='text-indigo-500'> {state} </span>Login</p>
     <div className='w-full'>
         <p>Email</p>
         <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1 ' type='email' required/>
     </div>
     <div className='w-full'>
         <p>Password</p>
         <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1 ' type='password' required/>
     </div>
     <button className='bg-indigo-500 text-white w-full py-2 rounded-md text-base'>Login</button>
     {
        state==="Admin"
        ?<p>Doctor Login?<span onClick={()=>setstate('Doctor')} className='text-indigo-500 underline cursor-pointer'>click here</span> </p>
        :<p>Admin Login?<span onClick={()=>setstate('Admin')} className='text-indigo-500 underline cursor-pointer'>click here</span> </p>
    }
    </div>
 </form>
  )
}

export default Login
