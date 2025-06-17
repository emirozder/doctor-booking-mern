import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { adminToken, adminSidebarItems } = useContext(AdminContext);
  const { doctorToken, doctorSidebarItems } = useContext(DoctorContext);

  return (
    <div className="min-h-[calc(100vh-77px)] bg-white border-r border-gray-200">
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          {adminSidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="min-w-5" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </ul>
      )}
      {doctorToken && (
        <ul className="text-[#515151] mt-5">
          {doctorSidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="min-w-5" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
