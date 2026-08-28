import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import { AppContext } from '../context/AppContext'

import axios from 'axios'

import { toast } from 'react-toastify'


const MyAppointments = () => {

  const {
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)


  const [appointments, setAppointments] = useState([])


  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]


  // ================= FORMAT DATE =================

  const slotDateFormat = (slotDate) => {

    if (!slotDate) return ""

    const dateArray = slotDate.split('_')

    return (
      dateArray[0] +
      " " +
      months[Number(dateArray[1])] +
      " " +
      dateArray[2]
    )

  }


  // ================= GET USER APPOINTMENTS =================

  const getUserAppointments = async () => {

    try {

      const { data } = await axios.get(

        backendUrl +
        '/api/user/appointments',

        {
          headers: {
            token
          }
        }

      )


      if (data.success) {

        setAppointments(data.appointments)

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message
      )

    }

  }


  // ================= CANCEL APPOINTMENT =================

  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(

        backendUrl +
        '/api/user/cancel-appointment',

        {
          appointmentId
        },

        {
          headers: {
            token
          }
        }

      )


      if (data.success) {

        toast.success(data.message)

        // Reload appointments
        getUserAppointments()
        getDoctorsData()


      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message
      )

    }

  }


  // ================= LOAD APPOINTMENTS =================

  useEffect(() => {

    if (token) {

      getUserAppointments()

    }

  }, [token])


  return (

    <div>

      {/* ================= TITLE ================= */}

      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>

        My appointments

      </p>


      {/* ================= APPOINTMENTS ================= */}

      <div>

        {

          appointments.length === 0 ? (

            <p className='text-gray-500 mt-5'>

              No appointments found.

            </p>

          ) : (

            appointments.map((item, index) => (

              <div
                className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
                key={item._id || index}
              >


                {/* ================= DOCTOR IMAGE ================= */}

                <div>

                  <img
                    className='w-32 bg-indigo-50'
                    src={item.docData?.image}
                    alt=''
                  />

                </div>


                {/* ================= DOCTOR INFORMATION ================= */}

                <div className='flex-1 text-sm text-zinc-600'>


                  <p className='text-neutral-800 font-semibold'>

                    {item.docData?.name}

                  </p>


                  <p>

                    {item.docData?.speciality}

                  </p>


                  {/* Address */}

                  <p className='text-zinc-700 font-medium mt-1'>

                    Address:

                  </p>


                  <p className='text-xs'>

                    {item.docData?.address?.line1}

                  </p>


                  <p className='text-xs'>

                    {item.docData?.address?.line2}

                  </p>


                  {/* Date & Time */}

                  <p className='text-xs mt-1'>

                    <span className='text-sm text-neutral-700 font-medium'>

                      Date & Time:

                    </span>

                    {' '}

                    {slotDateFormat(item.slotData)}

                    {' | '}

                    {item.slotTime}

                  </p>


                  {/* Cancelled message */}

                  {item.cancelled && (

                    <p className='text-red-500 text-sm mt-2'>

                      Appointment Cancelled

                    </p>

                  )}


                </div>


                {/* Empty div for spacing */}

                <div></div>


                {/* ================= BUTTONS ================= */}

                <div className='flex flex-col gap-2 justify-end'>


                  {/* PAY ONLINE */}

                  {!item.cancelled && (

                    <button
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'
                    >

                      Pay Online

                    </button>

                  )}


                  {/* CANCEL */}

                  {!item.cancelled && (

                    <button
                      onClick={() =>
                        cancelAppointment(item._id)
                      }
                      className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'
                    >

                      Cancel appointment

                    </button>

                  )}


                </div>


              </div>

            ))

          )

        }

      </div>

    </div>

  )

}


export default MyAppointments