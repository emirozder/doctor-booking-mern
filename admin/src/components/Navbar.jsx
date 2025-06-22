import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken } = useContext(DoctorContext);

  const handleLogout = () => {
    navigate("/");
    adminToken && setAdminToken("");
    adminToken && localStorage.removeItem("adminToken");
    doctorToken && setDoctorToken("");
    doctorToken && localStorage.removeItem("doctorData");
    doctorToken && localStorage.removeItem("doctorToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <img
          src={assets.admin_logo}
          alt="admin-logo"
          className="w-[150px] cursor-pointer"
        />
        <p className="px-2 py-0.5 rounded-full border border-gray-400 text-gray-600 text-xs">
          {adminToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="px-8 py-2 bg-primary text-white text-sm rounded-full cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
