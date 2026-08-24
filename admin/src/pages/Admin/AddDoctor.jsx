import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminCortext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandle = async (event) => {
    event.preventDefault()

    try {

      // Check image
      if (!docImg) {
        toast.error('Image Not selected')
        return
      }

      // Create FormData
      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)

      formData.append(
        'address',
        JSON.stringify({
          line1: address1,
          line2: address2
        })
      )

      // Show all data in console
      console.log('Doctor Data:')

      for (let [key, value] of formData.entries()) {
        console.log(key, ':', value)
      }

      console.log('Backend URL:', backendUrl)
      console.log('Admin Token:', aToken)

      // Send data to backend
      const { data } = await axios.post(
        backendUrl + '/api/admin/add-doctor',
        formData,
        {
          headers: {
            aToken: aToken
          }
        }
      )

      console.log('Backend Response:', data)

      if (data.success) {

        toast.success(data.message)

        // Reset form
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFees('')
        setAbout('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')

      } else {
        toast.error(data.message)
      }

    } catch (error) {

      console.log('Error:', error)

      if (error.response) {
        console.log('Backend Error:', error.response.data)
        toast.error(error.response.data.message || 'Something went wrong')
      } else {
        toast.error(error.message)
      }
    }
  }

  return (
    <form
      onSubmit={onSubmitHandle}
      className='m-5 w-full'
    >

      <p className='mb-3 text-lg font-medium'>
        Add Doctor
      </p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        {/* Doctor Image */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>

          <label htmlFor='doc-img'>

            <img
              className='w-16 h-16 bg-gray-100 rounded-full cursor-pointer object-cover'
              src={
                docImg
                  ? URL.createObjectURL(docImg)
                  : assets.upload_area
              }
              alt=''
            />

          </label>

          <input
            type='file'
            id='doc-img'
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p>
            Upload doctor <br />
            picture
          </p>

        </div>


        {/* Doctor Details */}
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>


          {/* Left Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>


            {/* Doctor Name */}
            <div className='flex flex-col gap-1'>

              <p>Doctor name</p>

              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>


            {/* Doctor Email */}
            <div className='flex flex-col gap-1'>

              <p>Doctor email</p>

              <input
                className='border rounded px-3 py-2'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            {/* Doctor Password */}
            <div className='flex flex-col gap-1'>

              <p>Doctor password</p>

              <input
                className='border rounded px-3 py-2'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            {/* Experience */}
            <div className='flex flex-col gap-1'>

              <p>Experience</p>

              <select
                className='border rounded px-3 py-2'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              >

                <option value='1 Year'>1 Year</option>
                <option value='2 Year'>2 Year</option>
                <option value='3 Year'>3 Year</option>
                <option value='4 Year'>4 Year</option>
                <option value='5 Year'>5 Year</option>
                <option value='6 Year'>6 Year</option>
                <option value='7 Year'>7 Year</option>
                <option value='8 Year'>8 Year</option>
                <option value='9 Year'>9 Year</option>
                <option value='10 Year'>10 Year</option>

              </select>

            </div>


            {/* Fees */}
            <div className='flex flex-col gap-1'>

              <p>Fees</p>

              <input
                className='border rounded px-3 py-2'
                type='number'
                placeholder='Fees'
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />

            </div>

          </div>


          {/* Right Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>


            {/* Speciality */}
            <div className='flex flex-col gap-1'>

              <p>Speciality</p>

              <select
                className='border rounded px-3 py-2'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              >

                <option value='General physician'>
                  General physician
                </option>

                <option value='Gynecologist'>
                  Gynecologist
                </option>

                <option value='Dermatologist'>
                  Dermatologist
                </option>

                <option value='Pediatricians'>
                  Pediatricians
                </option>

                <option value='Neurologist'>
                  Neurologist
                </option>

                <option value='Gastroenterologist'>
                  Gastroenterologist
                </option>

              </select>

            </div>


            {/* Education */}
            <div className='flex flex-col gap-1'>

              <p>Education</p>

              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Education'
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
              />

            </div>


            {/* Address */}
            <div className='flex flex-col gap-1'>

              <p>Address</p>

              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Address 1'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />

              <input
                className='border rounded px-3 py-2'
                type='text'
                placeholder='Address 2'
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />

            </div>

          </div>

        </div>


        {/* About Doctor */}
        <div className='mt-4 flex flex-col gap-1 text-gray-600'>

          <p>About Doctor</p>

          <textarea
            className='border rounded px-3 py-2 w-full'
            placeholder='Write about doctor'
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />

        </div>


        {/* Button */}
        <button
          type='submit'
          className='bg-primary text-white px-10 py-3 rounded-full mt-4'
        >
          Add Doctor
        </button>

      </div>

    </form>
  )
}

export default AddDoctor