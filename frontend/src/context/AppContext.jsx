import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currencySymbol = "$";
  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {}
  );

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(backendUrl + "/doctor/get-all-doctors");
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

  const value = {
    currencySymbol,
    backendUrl,
    doctors,
    doctorsLoading,
    fetchDoctors,
    token,
    setToken,
    userData,
    setUserData,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
