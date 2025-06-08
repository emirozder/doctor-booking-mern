import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Login from "./pages/Login";

const App = () => {
  const { adminToken } = useContext(AdminContext);

  return adminToken ? (
    <div className="font-outfit">
      <ToastContainer />
    </div>
  ) : (
    <div className="font-outfit">
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
