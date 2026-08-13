import React from 'react'
import { NavLink } from 'react-router-dom'
import Assets from '../assets/assets'

const Navbar = () => {
    return (
    <div >
        <img src={Assets.logo} alt="" />
        <ul>
            <NavLink>
                <li>Home</li>
            </NavLink>
        </ul>
    </div>


    )
}