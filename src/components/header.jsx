import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsCart } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideBar from "./side-bar";
import Logo from "./imgs/logo3.png";

function Header({ cart, userProfile }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setIsOverlayVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Refresh the page
    window.location.reload();
  };
  return (
    <>
      {isOverlayVisible && (
        <div
          className="overlay w-full h-full fixed top-0 left-0 bg-black opacity-50 z-10"
          onClick={() => {
            closeSidebar();
            closeDropdown(); // Close dropdown when overlay is clicked
          }}
        ></div>
      )}
      <div className="nav flex justify-between items-center bg-black text-white px-10 relative">
        <div className="logo flex items-center">
          {/* <button onClick={toggleSidebar}>
            <HiMenuAlt3 className="text-3xl cursor-pointer hover:text-[orange] font-bold" />
          </button> */}
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="ml-5"
              style={{ width: "150px" }}
            />
          </Link>
        </div>
        <div className="hidden lg:flex space-x-10">
          <Link
            to="/"
            className="hover:text-[orange] cursor-pointer font-medium text-xl"
          >
            Home
          </Link>
          <Link
            to="/deals"
            className="hover:text-[orange] cursor-pointer font-medium text-xl"
          >
            Deals
          </Link>
          <Link
            to="/order"
            className="hover:text-[orange] cursor-pointer font-medium text-xl"
          >
            Order
          </Link>
          <Link
            to="/caterin"
            className="hover:text-[orange] cursor-pointer font-medium text-xl"
          >
            Catering
          </Link>
          <Link
            to="/contact"
            className="hover:text-[orange] cursor-pointer font-medium text-xl"
          >
            Contact
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/cart">
            <button className="p-3 border-[orange] border-3 rounded-xl text-xl hover:bg-darkgreen transition relative">
              <BsCart />
            </button>
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-3xl lg:hidden ml-5"
              >
                <FaBars />
              </button>

              <Link to="/logout" onClick={(closeDropdown, handleLogout)}>
                <button className="p-3 border-[orange] border-3 rounded-xl text-xl hover:bg-darkgreen transition hidden lg:block ml-3">
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/signup">
                <button className="p-3 border-[orange] border-3 rounded-xl text-xl hover:bg-darkgreen transition hidden lg:block ml-3">
                  SignUp
                </button>
              </Link>
              <Link to="/login">
                <button className="p-3 border-[orange] border-3 rounded-xl text-xl hover:bg-darkgreen transition hidden lg:block ml-3">
                  Login
                </button>
              </Link>
            </>
          )}
          <button onClick={toggleDropdown} className="lg:hidden text-3xl ml-5">
            <FaBars />
          </button>
          {isDropdownVisible && (
            <div className="dropdown absolute right-0 top-full bg-darkgreen text-white mt-2 p-5 rounded-md z-20">
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-[orange]"
                    onClick={closeDropdown}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 hover:text-[orange]"
                    onClick={closeDropdown}
                  >
                    SignUp
                  </Link>
                </>
              )}
              <Link
                to="/"
                className="block py-2 hover:text-[orange]"
                onClick={closeDropdown}
              >
                Home
              </Link>
              <Link
                to="/deals"
                className="block py-2 hover:text-[orange]"
                onClick={closeDropdown}
              >
                Deals
              </Link>
              <Link
                to="/order"
                className="block py-2 hover:text-[orange]"
                onClick={closeDropdown}
              >
                Order
              </Link>
              <Link
                to="/caterin"
                className="block py-2 hover:text-[orange]"
                onClick={closeDropdown}
              >
                Catering
              </Link>
              <Link
                to="/contact"
                className="block py-2 hover:text-[orange]"
                onClick={closeDropdown}
              >
                Contact
              </Link>

              <Link
                to="/logout"
                className="block py-2 hover:text-[orange]"
                onClick={(closeDropdown, handleLogout)}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
      <SideBar isVisible={isSidebarVisible} onClose={closeSidebar} />
    </>
  );
}

export default Header;