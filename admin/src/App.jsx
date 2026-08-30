import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from './context/AdminCortext'
import { DoctorContext } from './context/DoctorContext.jsx'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import DoctorList from './pages/Admin/DoctorList'
import AddDoctor from './pages/Admin/AddDoctor'

import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorProfile from './pages/Doctor/DoctorProfile'


const App = () => {

  const { aToken } = useContext(AdminContext)

  const { dToken } = useContext(DoctorContext)


  return (
    <>
      {aToken || dToken ? (

        <div className='bg-[#F8F9FD] min-h-screen'>

          <Navbar />

          <div className='flex items-start'>

            <Sidebar />

            <div className='w-full'>

              <Routes>

                {/* ================= ADMIN ================= */}

                <Route
                  path='/'
                  element={<Dashboard />}
                />

                <Route
                  path='/admin-dashboard'
                  element={<Dashboard />}
                />

                <Route
                  path='/all-appointments'
                  element={<AllApointments />}
                />

                <Route
                  path='/add-doctor'
                  element={<AddDoctor />}
                />

                <Route
                  path='/doctor-list'
                  element={<DoctorList />}
                />


                {/* ================= DOCTOR ================= */}

                <Route
                  path='/doctor-dashboard'
                  element={<DoctorDashboard />}
                />

                <Route
                  path='/doctor-appointments'
                  element={<DoctorAppointments />}
                />

                <Route
                  path='/doctor-profile'
                  element={<DoctorProfile />}
                />

              </Routes>

            </div>

          </div>

        </div>

      ) : (

        <Login />

      )}

      <ToastContainer />

    </>
  )
}

export default App