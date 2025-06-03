import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  // const [showMenu, setShowMenu] = useState(false); //TODO
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm pt-4 pb-3 mb-5 border-b border-b-gray-400">
      <NavLink to="/">
        <img
          src={assets.logo}
          alt="healpoint_logo"
          className="w-[150px] cursor-pointer"
        />
      </NavLink>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0 transition-opacity duration-500" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={assets.profile_pic}
              alt="user-profile-pic"
              className="size-8 rounded-full"
            />
            <img
              src={assets.dropdown_icon}
              alt="menudropdown"
              className="w-2.5"
            />
            <div className="absolute top-0 right-0 pt-15 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded-sm flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    setToken(false);
                    navigate("/login");
                  }}
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
      </div>
    </div>
  );
};

export default Navbar;
