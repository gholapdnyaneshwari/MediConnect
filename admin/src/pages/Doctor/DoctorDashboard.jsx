import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const {
    dToken,
    dashData,
    getDashData,
    completeAppointment,
    cancelAppointment
  } = useContext(DoctorContext)

  const {
    currency,
    slotDateFormat
  } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])


  if (!dashData) {

    return (
      <div className='m-5'>
        <p className='text-gray-500'>
          Loading dashboard...
        </p>
      </div>
    )

  }


  return (

    <div className='m-5'>

      {/* ================= TOP CARDS ================= */}

      <div className='flex flex-wrap gap-3'>


        {/* Earnings */}

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>

          <img
            className='w-14'
            src={assets.earning_icon}
            alt=''
          />

          <div>

            <p className='text-xl font-semibold text-gray-600'>
              {currency} {dashData.earnings}
            </p>

            <p className='text-gray-400'>
              Earnings
            </p>

          </div>

        </div>


        {/* Appointments */}

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>

          <img
            className='w-14'
            src={assets.appointments_icon}
            alt=''
          />

          <div>

            <p className='text-xl font-semibold text-gray-600'>
              {dashData.appointments}
            </p>

            <p className='text-gray-400'>
              Appointments
            </p>

          </div>

        </div>


        {/* Patients */}

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>

          <img
            className='w-14'
            src={assets.patients_icon}
            alt=''
          />

          <div>

            <p className='text-xl font-semibold text-gray-600'>
              {dashData.patients}
            </p>

            <p className='text-gray-400'>
              Patients
            </p>

          </div>

        </div>

      </div>


      {/* ================= LATEST BOOKINGS ================= */}

      <div className='bg-white mt-10'>

        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>

          <img
            className='w-6 h-6'
            src={assets.list_icon}
            alt=''
          />

          <p className='font-semibold'>
            Latest Bookings
          </p>

        </div>


        <div className='pt-4 border border-t-0'>

          {
            dashData.latestAppointments?.map(
              (item, index) => (

                <div
                  className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'
                  key={index}
                >

                  {/* Patient Image */}

                  <img
                    className='rounded-full w-10'
                    src={item.userData?.image}
                    alt=''
                  />


                  {/* Patient Details */}

                  <div className='flex-1 text-sm'>

                    <p className='text-gray-800 font-medium'>
                      {item.userData?.name}
                    </p>

                    <p className='text-gray-600'>
                      {slotDateFormat(item.slotData)}
                    </p>

                    <p className='text-gray-500'>
                      {item.slotTime}
                    </p>

                  </div>


                  {/* Status / Actions */}

                  {
                    item.cancelled

                      ? (

                        <p className='text-red-400 text-xs font-medium'>
                          Cancelled
                        </p>

                      )

                      : item.isCompleted

                        ? (

                          <p className='text-green-500 text-xs font-medium'>
                            Completed
                          </p>

                        )

                        : (

                          <div className='flex gap-2'>

                            {/* Cancel */}

                            <img
                              onClick={() =>
                                cancelAppointment(item._id)
                              }
                              className='w-10 cursor-pointer'
                              src={assets.cancel_icon}
                              alt='Cancel'
                            />


                            {/* Complete */}

                            <img
                              onClick={() =>
                                completeAppointment(item._id)
                              }
                              className='w-10 cursor-pointer'
                              src={assets.tick_icon}
                              alt='Complete'
                            />

                          </div>

                        )
                  }

                </div>

              )
            )
          }

        </div>

      </div>

    </div>

  )

}

export default DoctorDashboard