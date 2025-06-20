import { createContext , useState} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'



export const AdminContext = createContext()

const AdminContextProvider = (props) =>{
   

    const [doctors , setdoctors] = useState([])

    const [atoken , setatoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async() =>{
        

        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors' , {} , {headers:{atoken}})
            if(data.success){
                setdoctors(data.doctors)
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async(docId) =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availabilty' , {docId} , {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
                console.log(data)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const value = {
       atoken,setatoken,backendUrl , doctors , getAllDoctors , changeAvailability
    }

    return(
        <AdminContext.Provider value={value}>
                {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider