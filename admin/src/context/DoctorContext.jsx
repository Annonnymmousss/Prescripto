import axios from 'axios'
import { useState } from "react";
import { createContext } from "react";
import {toast} from 'react-toastify'


export const DoctorContext = createContext()

const DoctorContextProvider = (props) =>{
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [dtoken , setdtoken] = useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken') : '')
   const [appointments , setappointments] = useState([])
   const [dashData , setdashData] = useState(false)

   const getAppointments = async() => {
    try {
        const {data} = await axios.get(backendUrl + '/api/doctor/appointments' , {headers:{dtoken}})
        if(data.success){
            setappointments(data.appointments)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
   }

   const completeAppointment = async(appointmentId) => {
    try {
        const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment' , {appointmentId} , {headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
   }

      const cancelAppointment = async(appointmentId) => {
    try {
        const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment' , {appointmentId} , {headers:{dtoken}})
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
   }

   const getDashData = async() => {
    try {
        const {data} = await axios.get(backendUrl + "/api/doctor/dashboard" , {headers:{dtoken}})
        if(data.success){
            setdashData(data.dashData)
            console.log(data.dashData)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }
   }


    const value = {
       dtoken , setdtoken , backendUrl,appointments,setappointments,getAppointments,cancelAppointment,completeAppointment , dashData,setdashData,getDashData
    }

    return(
        <DoctorContext.Provider value={value}>
                {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider