import React, { useState, useEffect } from 'react';
import logo from './imgs/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOpenStatus = () => {
            const now = new Date();
            const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
            const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

            // Define open and close times in minutes from midnight
            const schedule = {
                0: { open: 11 * 60, close: 22 * 60 },     // Sunday: 11:00 AM to 10:00 PM
                1: { open: 11 * 60, close: 22 * 60 },     // Monday: 11:00 AM to 10:00 PM
                2: { open: 11 * 60, close: 22 * 60 },     // Tuesday: 11:00 AM to 10:00 PM
                3: { open: 11 * 60, close: 25 * 60 },     // Thursday: 11:00 AM to 1:00 AM (next day)
                4: { open: 11 * 60, close: 26 * 60 },     // Friday: 11:00 AM to 2:00 AM (next day)
                5: { open: 11 * 60, close: 26 * 60 },     // Saturday: 11:00 AM to 2:00 AM (next day)
            };

            const todaySchedule = schedule[currentDay];
            const isOpenNow = currentTime >= todaySchedule.open && currentTime <= todaySchedule.close;

            setIsOpen(isOpenNow);
        };

        checkOpenStatus();

        // Optionally, check the status every minute
        const interval = setInterval(checkOpenStatus, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="footer bg-black text-white p-10 mt-1">
                <div className="top flex justify-center items-center">
                    <div className="logo max-w-9">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="social flex">
                        <a href="https://www.facebook.com/share/6sTMBuTphBKpBGQh/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-4xl ml-8 hover:cursor-pointer hover:text-orange'>
                                <FaFacebook />
                            </h1>
                        </a>
                        <a href="https://www.instagram.com/hhwiches?igsh=MXB6N2w3OWF3dWxxcg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-4xl ml-8 hover:cursor-pointer hover:text-orange'>
                                <FaInstagram />
                            </h1>
                        </a>
                        <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-4xl ml-8 hover:cursor-pointer hover:text-orange'>
                                <IoLogoWhatsapp />
                            </h1>
                        </a>
                        <a href="https://www.tiktok.com/@your_tiktok_profile" target="_blank" rel="noopener noreferrer">
                            <h1 className='text-4xl ml-8 hover:cursor-pointer hover:text-orange'>
                                <FaTiktok />
                            </h1>
                        </a>
                    </div>
                </div>
                <div className="justify-between mt-10 lg:px-20 md:px-10">
                    <div className="about">
                        <div className="ul list-none mr-5">
                            <Link to='/about'><li className='text-1xl font-bold hover:cursor-pointer hover:text-[orange]'>About Us</li></Link>
                            <Link to='/privacy'><li className='text-1xl hover:cursor-pointer hover:text-[orange]'>Privacy Policy</li></Link>
                            <Link to='/feedback'><li className='text-1xl hover:cursor-pointer hover:text-[orange]'>Feedback</li></Link>
                        </div>
                    </div>
                    <div className="contect list-none">
                        <div className="ul">
                            <Link to="/contact"><li className='text-1xl font-bold hover:cursor-pointer hover:text-[orange]'>Contact Us</li></Link>
                            <a href="https://www.google.com/maps/dir/5002+Washington+Avenue,+Houston,+TX+77007,+USA//@29.770656,-95.4146063,17z/data=!4m8!4m7!1m5!1m1!1s0x8640c0b4d6bc43eb:0x5b17191f18cd5575!2m2!1d-95.412026!2d29.770656!1m0?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D">
                                <li className='text-1xl hover:cursor-pointer hover:text-[orange]'>Store Locator</li>
                            </a>
                            <Link to='/terms'><li className='text-1xl hover:cursor-pointer hover:text-[orange]'>Terms & Conditions</li></Link>
                        </div>
                    </div>
                
                    <div className="store-hours mt-5">
                        <h2 className='text-2xl'>{isOpen ? 'Open' : 'Closed'}</h2>
                        <h2>Monday: Closed</h2>
                        <p> Tuesday, Sunday: 11:00 AM - 10:00 PM</p>
                        <p>Thursday: 11:00 AM - 1:00 AM</p>
                        <p>Friday, Saturday: 11:00 AM - 2:00 AM</p>
                    </div>
                    <div>
                        <h1 className='copyrights mt-2'>@ Powered By Diverse Communications</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
