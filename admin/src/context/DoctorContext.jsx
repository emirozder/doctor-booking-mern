import { createContext, useState } from "react";
import { assets } from "../assets/assets";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken") ?? ""
  );
  const doctorSidebarItems = [
    {
      path: "/doctor-dashboard",
      name: "Dashboard",
      icon: assets.home_icon,
    },
    {
      path: "/doctor-appointments",
      name: "Appointments",
      icon: assets.appointment_icon,
    },
    {
      path: "/doctor-profile",
      name: "Profile",
      icon: assets.people_icon,
    },
  ];

  const value = {
    backendUrl,
    doctorToken,
    setDoctorToken,
    doctorSidebarItems,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
