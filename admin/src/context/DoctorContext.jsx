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

  // Handle cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: {
            token: doctorToken,
          },
        }
      );
      if (response.data.success) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments(); // Refresh appointments after cancellation
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel appointment. Please try again later."
      );
    }
  };

  // Handle complete appointment
  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        backendUrl + "/doctor/complete-appointment",
        { appointmentId },
        {
          headers: {
            token: doctorToken,
          },
        }
      );
      if (response.data.success) {
        toast.success("Appointment completed successfully");
        fetchAppointments(); // Refresh appointments after completion
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to complete appointment. Please try again later."
      );
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
    handleCancelAppointment,
    handleCompleteAppointment,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
