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

const App = () => {

  const {atoken} = useContext(AdminContext)
  return atoken ? 
    (
      <div>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <SideBar/>
          <Routes>
            <Route path='/' element={<></>}/>
            <Route path='/admin-dashboard' element={<Dashboard/>} />
            <Route path='/add-doctor' element={<AddDoctor/>} />
            <Route path='/doctor-list' element={<DoctorsList/>} />
            <Route path='/all-appointments' element={<AllAppointments/>} />
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
