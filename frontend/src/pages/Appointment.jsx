import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams()

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  // ================= FETCH DOCTOR INFO =================

  const fetchDocInfo = () => {

    const doctor = doctors.find(doc => doc._id === docId)

    setDocInfo(doctor)

  }


  // ================= GET AVAILABLE SLOTS =================

  const getAvailableSlots = () => {

    if (!docInfo) return

    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)

      currentDate.setDate(today.getDate() + i)

      let endTime = new Date(today)

      endTime.setDate(today.getDate() + i)

      endTime.setHours(21, 0, 0, 0)


      // Today's slots
      if (today.getDate() === currentDate.getDate()) {

        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        )

        currentDate.setMinutes(
          currentDate.getMinutes() > 30
            ? 30
            : 0
        )

      } else {

        // Future days start at 10 AM
        currentDate.setHours(10)

        currentDate.setMinutes(0)

      }


      let timeSlots = []


      while (currentDate < endTime) {

        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })


        // Create date key
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        const slotData = day + "_" + month + "_" + year


        // Check whether this slot is already booked
        const isSlotAvailable =
          !docInfo.slots_booked?.[slotData]?.includes(formattedTime)


        if (isSlotAvailable) {

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }


        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        )

      }


      setDocSlots(prev => [
        ...prev,
        timeSlots
      ])

    }

  }


  // ================= BOOK APPOINTMENT =================

  const bookAppointment = async () => {

    if (!token) {

      toast.warn('Login to book appointment')

      return navigate('/login')

    }


    if (!slotTime) {

      toast.warn('Select a time slot')

      return

    }


    try {

      // Make sure selected day exists
      if (!docSlots[slotIndex] || !docSlots[slotIndex][0]) {

        toast.error('Please select a valid date')

        return

      }


      const date = docSlots[slotIndex][0].datetime


      const day = date.getDate()

      const month = date.getMonth() + 1

      const year = date.getFullYear()


      const slotData = day + "_" + month + "_" + year


      const { data } = await axios.post(

        backendUrl + '/api/user/book-appointment',

        {
          docId,
          slotData,
          slotTime
        },

        {
          headers: {
            token
          }
        }

      )


      if (data.success) {

        toast.success(data.message)

        await getDoctorsData()

        navigate('/my-appointments')

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


  // ================= USE EFFECT =================

  useEffect(() => {

    fetchDocInfo()

  }, [doctors, docId])


  useEffect(() => {

    if (docInfo) {

      getAvailableSlots()

    }

  }, [docInfo])


  return (

    <div>

      {/* Doctor Details */}

      <div className='flex flex-col sm:flex-row gap-4'>

        <div>

          <img
            className='bg-primary w-full sm:max-w-72 rounded-lg'
            src={docInfo?.image}
            alt=''
          />

        </div>


        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>

            {docInfo?.name}

            <img
              className='w-5'
              src={assets.verified_icon}
              alt=''
            />

          </p>


          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>

            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>

            <button className='py-0.5 px-2 border text-xs rounded-full'>

              {docInfo?.experience}

            </button>

          </div>


          <div>

            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>

              About

              <img
                src={assets.info_icon}
                alt=''
              />

            </p>


            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>

              {docInfo?.about}

            </p>

          </div>


          <p className='text-gray-500 font-medium mt-4'>

            Appointment fee:

            <span className='text-gray-600 ml-1'>

              {currencySymbol}
              {docInfo?.fees}

            </span>

          </p>

        </div>

      </div>


      {/* Booking Slots */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>

        <p>Booking slots</p>


        {/* Dates */}

        <div className='flex gap-3 items-center w-full overflow-scroll mt-4'>

          {docSlots.length > 0 &&

            docSlots.map((item, index) => (

              <div
                key={index}
                onClick={() => {

                  setSlotIndex(index)

                  setSlotTime('')

                }}
                className={`text-center py-3 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? 'bg-primary text-white'
                    : 'border border-gray-300'
                }`}
              >

                <p>

                  {item[0] &&
                    daysOfWeek[item[0].datetime.getDay()]
                  }

                </p>


                <p>

                  {item[0] &&
                    item[0].datetime.getDate()
                  }

                </p>

              </div>

            ))

          }

        </div>


        {/* Time Slots */}

        <div className='flex items-center gap-3 w-full overflow-scroll mt-4'>

          {docSlots.length > 0 &&

            docSlots[slotIndex]?.map((item, index) => (

              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-gray-400 border border-gray-300'
                }`}
              >

                {item.time}

              </p>

            ))

          }

        </div>


        {/* Book Button */}

        <button
          onClick={bookAppointment}
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'
        >

          Book an appointment

        </button>

      </div>


      <RelatedDoctors
        docId={docId}
        speciality={docInfo?.speciality}
      />

    </div>

  )

}

export default Appointment