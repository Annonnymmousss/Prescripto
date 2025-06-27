import React , {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar.jsx';
import SideBar from './components/SideBar.jsx'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {

  const {atoken} = useContext(AdminContext)
  const {dtoken} = useContext(DoctorContext)
  return atoken||dtoken ? 
    (
      <div>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <SideBar/>
          <Routes>
            {/*Admins Route*/}
            <Route path='/' element={<></>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>} />
            <Route path='/add-doctor' element={<AddDoctor/>} />
            <Route path='/doctor-list' element={<DoctorsList/>} />
            <Route path='/all-appointments' element={<AllAppointments/>} />

            {/*Doctors Route*/}
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
            <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
            <Route path='/doctor-profile' element={<DoctorProfile/>} />
          </Routes>
        </div>
      </div>
    ) : (
      <>
        <Login/>
        <ToastContainer/>
      </>
    )
  ;
  
  
}

export default App
