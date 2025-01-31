import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { GoHeartFill } from 'react-icons/go';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { HiOutlineUser } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Logo from "../assets/logoSea.png";
import avatarImg from "../assets/avatar.png";

const navigation = [
    {name: "Mis compras", href:"/my-purchases"},
    {name: "Carrito", href:"/cart"},
    {name: "Mi cuenta", href:"/account"},
];

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);
    const favoriteItems = useSelector(state => state.favorites.favoriteItems);
    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
    };

    const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/productos/search?query=${searchQuery.trim()}`);
        }
    };

    return (
        <header className="w-full px-4 py-6 bg-[#DCE4C9]">
            <nav className="max-w-screen mx-auto flex justify-between items-center px-4 py-6">
                {/* left side */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-24" />
                    </Link>

                    {/* search input */}
                    <form onSubmit={handleSearchSubmit} className='relative sm:w-72 w-40 space-x-2'>
                        <IoSearchSharp className='absolute inline-block left-3 inset-y-2'/>
                        <input
                            type="text"
                            placeholder='Buscar aquí'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='bg-[#EAEAEA] w-full py-1 md:px-6 rounded-md focus:outline-none'
                        />
                    </form>
                </div>

                {/* rigth side */}
                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={ avatarImg } alt="logged in user" className={`size-6 rounded-full ${currentUser ? 'ring-2 ring-green-500 ':''}`} />
                                </button>
                                {/* show dropdowns */}
                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                        <ul className='py-2'>
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className='block px-4 py-2 text-sm hover:bg-gray-100'>Salir</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login">< HiOutlineUser className="size-6" /></Link>
                        )}
                    </div>
                    <Link to="/favorites" className='flex items-center'>
                        <GoHeartFill className='text-gray-600 hover:text-gray-800 size-6' />
                    </Link>
                    <Link to="/cart" className="flex items-center">
                        <HiMiniShoppingCart className="text-gray-600 hover:text-gray-800 size-6" />
                        {totalCartItems > 0 ? (
                            <span className="text-sm font-semibold sm:ml-1">{totalCartItems}</span>
                        ) : (
                            <span className="text-sm font-semibold sm:ml-1">0</span>
                        )}
                    </Link>
                </div>
            </nav>
        </header>
    )
};

export default NavBar;
