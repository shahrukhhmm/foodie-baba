import React, { useState, useEffect } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { Link } from 'react-router-dom';

function SideBar({ isVisible, onClose }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if token exists in local storage
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        // Refresh the page
        window.location.reload();
    };

    return (
        <div className={`SideBar bg-white top-0 h-full fixed z-20 transition-transform duration-300 ease-in-out transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:w-1/4 w-3/4`}>
            <div className="flex justify-between items-center p-5">
                <div>
                    {isLoggedIn ? (
                        <button 
                            className='py-2 px-4 bg-darkgreen text-white text-lg rounded-lg hover:cursor-pointer hover:bg-green-700' 
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to='/login'>
                            <button className='py-2 px-4 bg-red-500 text-white text-lg rounded-lg hover:cursor-pointer hover:bg-green-700'>
                                Login
                            </button>
                        </Link>
                    )}
                </div>
                <button onClick={onClose} className="text-2xl text-black hover:text-red-500">
                    <AiOutlineClose />
                </button>
            </div>
            <div className="customer border-y-2 border-black py-5 px-4">
                <ul className='list-none'>
                    <Link to="https://www.google.com/maps/place/5002+Washington+Ave,+Houston,+TX+77007,+USA/@29.7706606,-95.4146009,17z/data=!3m1!4b1!4m6!3m5!1s0x8640c0b4d6bc43eb:0x5b17191f18cd5575!8m2!3d29.770656!4d-95.412026!16s%2Fg%2F11c4wzhhbr?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D">
                    <li className='mt-5 text-xl font-medium flex items-center hover:cursor-pointer hover:text-green-700'>
                        <CiLocationOn className='text-2xl mr-3'/> 
                        Store Locator
                    </li></Link>
                    <Link to="/menu">
                        <li className='mt-5 text-xl font-medium flex items-center hover:cursor-pointer hover:text-green-700'>
                            <TfiMenuAlt className='text-2xl mr-3'/> 
                            Explore Menu
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="company-info p-4">
                <h2 className='text-2xl font-semibold mb-4'>Company Info</h2>
                <ul>
                    <Link to="/about">
                        <li className='mb-4 text-xl font-medium hover:text-green-700 hover:cursor-pointer'>About Us</li>
                    </Link>
                    <Link to="/contact">
                        <li className='mb-4 text-xl font-medium hover:text-green-700 hover:cursor-pointer'>Contact Us</li>
                    </Link>
                    <Link to="/careers">
                        <li className='mb-4 text-xl font-medium hover:text-green-700 hover:cursor-pointer'>Careers</li>
                    </Link>
                    <Link to="/privacy">
                        <li className='mb-4 text-xl font-medium hover:text-green-700 hover:cursor-pointer'>Privacy Policy</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;
