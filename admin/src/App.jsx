import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { AdminContext } from "./context/AdminContext";
import Login from "./pages/Login";

const App = () => {
  const { adminToken } = useContext(AdminContext);

  return adminToken ? (
    <div className="font-outfit">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <div className="font-outfit">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
