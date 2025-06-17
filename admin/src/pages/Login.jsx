import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { setDoctorToken } = useContext(DoctorContext);
  const [state, setState] = useState("Admin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const res = await axios.post(`${backendUrl}/admin/login`, formData);
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setAdminToken(res.data.token);
          navigate("/admin-dashboard");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/doctor/login`, formData);
        if (res.data.success) {
          localStorage.setItem("doctorToken", res.data.token);
          setDoctorToken(res.data.token);
          navigate("/doctor-dashboard");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold w-full text-center">
          <span className="text-primary">{state}</span> Login
        </p>

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            required
            placeholder="Enter your email"
            className="w-full p-2 mt-1 border border-zinc-300 rounded"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            required
            placeholder="Enter your password"
            className="w-full p-2 mt-1 border border-zinc-300 rounded"
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-primary/90 transition-all duration-300">
          Login
        </button>

        {state === "Admin" ? (
          <p className="text-sm">
            Doctor Login?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Admin Login?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
