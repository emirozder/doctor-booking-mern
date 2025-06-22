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
  const [doctorData, setDoctorData] = useState(
    localStorage.getItem("doctorData")
      ? JSON.parse(localStorage.getItem("doctorData"))
      : {}
  );
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [doctorDashboardData, setDoctorDashboardData] = useState({});
  const [doctorDashboardDataLoading, setDoctorDashboardDataLoading] =
    useState(true);
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
  const dashboardItems = [
    {
      name: "Earnings",
      count: doctorDashboardData?.earnings || 0,
      img: assets.earning_icon,
    },
    {
      name: "Total Patients",
      count: doctorDashboardData?.patients || 0,
      img: assets.patients_icon,
    },
    {
      name: "Total Appointments",
      count: doctorDashboardData?.appointments || 0,
      img: assets.appointments_icon,
    },
  ];

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

  // Fetch doctor dashboard data
  const fetchDoctorDashboard = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/doctor/doctor-dashboard",
        {
          headers: {
            token: doctorToken,
          },
        }
      );
      if (response.data.success) {
        setDoctorDashboardData(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctor dashboard:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch doctor dashboard. Please try again later."
      );
    } finally {
      setDoctorDashboardDataLoading(false);
    }
  };

  const value = {
    backendUrl,
    doctorToken,
    doctorData,
    setDoctorData,
    setDoctorToken,
    doctorSidebarItems,
    appointments,
    appointmentsLoading,
    fetchAppointments,
    handleCancelAppointment,
    handleCompleteAppointment,
    fetchDoctorDashboard,
    doctorDashboardData,
    doctorDashboardDataLoading,
    dashboardItems,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
