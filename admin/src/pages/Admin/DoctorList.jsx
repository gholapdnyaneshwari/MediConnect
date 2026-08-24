import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminCortext'

const DoctorList = () => {

  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 w-full'>

      {/* Heading */}
      <p className='mb-3 text-lg font-medium'>
        All Doctors
      </p>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6'>

        {
          doctors.map((item, index) => (

            <div
              key={index}
              className='border border-gray-200 rounded-xl overflow-hidden cursor-pointer group'
            >

              {/* Doctor Image */}
              <div className='bg-primary/10 group-hover:bg-primary transition-all duration-300'>
                <img
                  className='w-full h-48 object-contain transition-all duration-300'
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Doctor Details */}
              <div className='p-4 bg-white'>

                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  ></span>

                  <p>
                    {item.available ? 'Available' : 'Not Available'}
                  </p>
                </div>

                <p className='text-gray-900 text-lg font-medium mt-2'>
                  {item.name}
                </p>

                <p className='text-gray-600 text-sm'>
                  {item.speciality}
                </p>

                {/* Availability Checkbox */}
                <div className='flex items-center gap-2 mt-3'>

                  <input
                    type='checkbox'
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className='w-4 h-4 cursor-pointer accent-primary'
                  />

                  <p className='text-sm text-gray-600'>
                    Available
                  </p>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default DoctorList