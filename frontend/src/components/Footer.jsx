import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10 mt-20'>

            {/*--------Footer sections-----------*/}
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 py-10 text-sm'>

                {/*--------Left section-----------*/}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />

                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book.
                    </p>
                </div>

                {/*--------Center section-----------*/}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>

                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/*--------Right section-----------*/}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <li>+1-234-333-4890</li>
                        <li>mediconnect@gmail.com</li>
                    </ul>
                </div>

            </div>

            {/*--------copyright text-----------*/}
            <div>
                <hr className='border-gray-300' />

                <p className='py-5 text-sm text-center text-gray-600'>
                    Copyright 2024@ MediConnect - All Right Reserved.
                </p>
            </div>

        </div>
    )
}

export default Footer