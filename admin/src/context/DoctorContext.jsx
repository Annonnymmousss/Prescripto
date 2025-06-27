
import { useState } from "react";
import { createContext } from "react";



export const DoctorContext = createContext()

const DoctorContextProvider = (props) =>{
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [dtoken , setdtoken] = useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken') : '')


    const value = {
       dtoken , setdtoken , backendUrl
    }

    return(
        <DoctorContext.Provider value={value}>
                {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider