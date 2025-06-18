import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
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
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/doctor/get-doctor-appointments",
        {
          headers: {
            token: doctorToken,
          },
        }
      );
      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch appointments. Please try again later."
      );
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const value = {
    backendUrl,
    doctorToken,
    setDoctorToken,
    doctorSidebarItems,
    appointments,
    appointmentsLoading,
    fetchAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
