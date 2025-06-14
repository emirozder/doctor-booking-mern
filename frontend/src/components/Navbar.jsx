import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    navigate("/login");
    token && setToken("");
    token && localStorage.removeItem("token");
    localStorage.removeItem("userData");
    scrollTo(0, 0);
  };

  return (
    <div className="flex items-center justify-between text-sm pt-4 pb-3 mb-5 border-b border-b-gray-400 sticky top-0 right-0 bg-white z-50">
      <NavLink to="/" onClick={() => scrollTo(0, 0)}>
        <img
          src={assets.logo}
          alt="healpoint_logo"
          className="w-[150px] cursor-pointer"
        />
      </NavLink>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/" onClick={() => scrollTo(0, 0)}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/doctors" onClick={() => scrollTo(0, 0)}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/about" onClick={() => scrollTo(0, 0)}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/contact" onClick={() => scrollTo(0, 0)}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
      </ul>
      <div
        onMouseEnter={() => setShowProfileDropdown(true)}
        onMouseLeave={() => setShowProfileDropdown(false)}
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center gap-4"
      >
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img
              src={userData.image}
              alt="user-profile-pic"
              className="size-8 rounded-full"
            />
            <img
              src={assets.dropdown_icon}
              alt="menudropdown"
              className="w-2.5"
            />
            <div
              className={`absolute top-0 right-0 pt-15 text-base font-medium text-gray-600 z-20 ${
                showProfileDropdown ? "block" : "hidden"
              }`}
            >
              <div className="min-w-48 bg-stone-100 rounded-sm flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    scrollTo(0, 0);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    scrollTo(0, 0);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-5 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create Account
          </button>
        )}

        <img
          src={assets.menu_icon}
          alt="menu-icon"
          onClick={() => setShowMenu(true)}
          className="size-6 md:hidden"
        />
        {/* MOBILE MENU */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="logo" className="w-28" />
            <img
              src={assets.cross_icon}
              alt="close-icon"
              onClick={() => setShowMenu(false)}
              className="size-7"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink to="/" onClick={() => setShowMenu(false)}>
              <li className="py-1">HOME</li>
              <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
            </NavLink>
            <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
              <li className="py-1">ALL DOCTORS</li>
              <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)}>
              <li className="py-1">ABOUT</li>
              <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)}>
              <li className="py-1">CONTACT</li>
              <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
