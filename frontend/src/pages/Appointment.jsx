import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets 2'
import RelatedDoc from '../components/RelatedDoc'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors } = useContext(AppContext)
  const { currencySymbol } = useContext(AppContext)
  const daysOfWeeks = ['SUN' , 'MON' , 'TUE' , 'WED' , 'THUR' , 'FRI' , 'SAT']

  const [docInfo, setdocInfo] = useState(null)
  const [docSlot, setdocSlot] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')
  



  const fetchDocInfo = async() => {

    const docInfo = doctors.find(doc => doc._id === docId)
    setdocInfo(docInfo)
    console.log(docInfo)
  }

  const getAvailaibleSlot = async() => {
      setdocSlot([])
      for(let i=0 ; i<7 ; i++){
        //getting current date
      const today = new Date()

      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with index 
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //setting hours 
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots=[]

    while(currentDate<endTime){
      let formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      

      //add slot to array 
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
      })

      //increment current time by 30 minutes 
      currentDate.setMinutes(currentDate.getMinutes()+30)
    }

    setdocSlot(prev=>([...prev,timeSlots]))
  }
      
  }
  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])

  useEffect(()=>{
    getAvailaibleSlot()
  },[docInfo])

  useEffect(()=>{
      console.log(docSlot)
  },[docSlot])
  return docInfo&& (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-blue-50 w-full sm:max-w-72 rounded-lg border-blue-200 border ' src={docInfo.image}/>
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
          <img className='w-5' src={assets.verified_icon}/>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon}/> </p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>
          Appointment Fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
        </p>
        </div>      
      </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot.map((item , index)=>(
              <div onClick={()=>setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-indigo-500 text-white' : 'border border-gray-200' }`} key={index}>
                <p>{item[0] && daysOfWeeks[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>


              </div>

            ))
          }

        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[slotIndex].map((item,index)=>(
            <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime?'bg-indigo-500 text-white':'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>
      <RelatedDoc docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
