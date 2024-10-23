import React from 'react'
import { FaBars } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";

const navigation = [
    {name: "Dashboard", href:"/dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const NavBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    console.log(isDropdownOpen);
    
    const currentUser = true;
  return (
    <header className="max-w-screen-2x1 mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
            {/* left side */}
            <div className='flex items-center md:gap-16 gap-4'>
                <Link to="/">
                <FaBars className='size-6'/>
                </Link>

                {/* search input */}
                <div className='relative sm:w-72 w-40 space-x-2'>
                <IoSearchSharp className='absolute inline-block left-3 inset-y-2'/>
                <input type="text" placeholder='Search here' className='bg-[#EAEAEA] w-full py-1 md:px-6 rounded-md focus:outline-none'/>
                </div>
            </div>

            {/* rigth side */}
            <div className='relative flex items-center md:space-x-3 space-x-2'>
                <div>
                    {
                        currentUser ? <>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={ avatarImg } alt="logged in user"className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500':'' }`} />
                        </button>
                        {/* show dropdowns */}
                        {
                            isDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                    <ul className='py-2'>
                                        {
                                            navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                        </> : <Link to="/login">< HiOutlineUser className="size-6" /></Link>
                    }
                </div>
            <FaUserCircle className='size-6'/>
            <button className='hidden sm:block'>
            <GoHeartFill className='size-6'/>
            </button>
            <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center'>
            <HiMiniShoppingCart className=''/>
            <span className='text-sm font-semibold sm:ml-1'>0</span>
            </Link>
            </div>
        </nav>
    </header>
  )
}

export default NavBar
