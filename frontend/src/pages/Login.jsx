import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { backendUrl, token, setToken, setUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    try {
      if (state === "Sign Up") {
        // Sign Up Logic
        if (!name || !email || !password) {
          toast.error("All fields are required for sign up.");
          return;
        }
        // Call API to sign up
        const res = await axios.post(`${backendUrl}/user/register`, {
          name,
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserData(res.data.data); // Set user data in context
          navigate("/"); // Redirect to home page after successful sign up
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Login Logic
        if (!email || !password) {
          toast.error("Email and password are required for login.");
          return;
        }
        // Call API to log in
        const res = await axios.post(`${backendUrl}/user/login`, {
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          setUserData(res.data.data); // Set user data in context
          navigate("/"); // Redirect to home page after successful login
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(
        `Error ${state === "Sign Up" ? "signing up" : "logging in"}`,
        error
      );
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to ${
            state === "Sign Up" ? "sign up" : "log in"
          }. Please try again later.`
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [token]);

  return (
    <form onSubmit={onSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment.
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              required
              placeholder="Enter your full name"
              className="w-full p-2 mt-1 border border-zinc-300 rounded"
            />
          </div>
        )}

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
            autoComplete={
              state === "Sign Up" ? "new-password" : "current-password"
            }
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-primary/90 transition-all duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
