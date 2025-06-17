import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ?? ""
  );
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [adminDashboardData, setAdminDashboardData] = useState({});
  const [adminDashboardDataLoading, setAdminDashboardDataLoading] =
    useState(true);
  const dashboardItems = [
    {
      name: "Total Patients",
      count: adminDashboardData?.totalUsers || 0,
      img: assets.patients_icon,
    },
    {
      name: "Total Doctors",
      count: adminDashboardData?.totalDoctors || 0,
      img: assets.doctor_icon,
    },
    {
      name: "Total Appointments",
      count: adminDashboardData?.totalAppointments || 0,
      img: assets.appointments_icon,
    },
  ];

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(backendUrl + "/admin/get-all-doctors", {
        headers: {
          token: adminToken,
        },
      });
      if (response.data.success) {
        setDoctors(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch doctors. Please try again later."
      );
    } finally {
      setDoctorsLoading(false);
    }
  };

  const changeAvailability = async (doctorId) => {
    try {
      const response = await axios.post(
        backendUrl + "/admin/change-availability",
        { docId: doctorId },
        {
          headers: {
            token: adminToken,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchDoctors(); // Refresh the doctor list after changing availability
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error changing availability:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to change availability. Please try again later."
      );
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/admin/get-all-appointments",
        {
          headers: {
            token: adminToken,
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

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/admin/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token: adminToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAppointments(); // Refresh the appointments list
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

  const fetchAdminDashboardData = async () => {
    try {
      const response = await axios.get(backendUrl + "/admin/admin-dashboard", {
        headers: {
          token: adminToken,
        },
      });
      if (response.data.success) {
        setAdminDashboardData(response.data.data);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching admin dashboard:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch admin dashboard. Please try again later."
      );
    } finally {
      setAdminDashboardDataLoading(false);
    }
  };

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    doctorsLoading,
    fetchDoctors,
    changeAvailability,
    appointments,
    appointmentsLoading,
    fetchAppointments,
    handleCancelAppointment,
    fetchAdminDashboardData,
    adminDashboardData,
    adminDashboardDataLoading,
    dashboardItems,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
