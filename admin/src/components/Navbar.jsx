import { useContext } from 'react'
import { AdminContext } from '../context/AdminCortext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white'>

      <div className='flex items-center gap-2 text-xs'>
        <img
          className='w-36 sm:w-44 cursor-pointer'
          src={assets.admin_logo}
          alt='Admin Logo'
        />

        <p className='border px-2.5 py-0.5 rounded-full  border-gray-500 texy-gray-600 text-xs'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      <button
        onClick={logout}
        className='bg-primary text-white px-5 py-2 rounded-full text-sm'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar