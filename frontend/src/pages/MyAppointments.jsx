import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateParts = slotDate.split("_");
    const day = dateParts[0];
    const month = months[parseInt(dateParts[1], 10) - 1]; // Convert month to zero-based index
    const year = dateParts[2];

    return `${day} ${month} ${year}`;
  };

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${backendUrl}/user/get-user-appointments`,
        {
          headers: {
            token,
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
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            token,
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

  // Fetch appointments when the component mounts
  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300">
        My Appointments
      </p>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-36">
          <img
            src={assets.loading_icon}
            alt="loading"
            className="animate-spin size-8"
          />
        </div>
      ) : (
        <>
          {appointments?.length > 0 ? (
            <div>
              {appointments?.map((appointment, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300 px-2 ${
                    appointment?.cancelled ? "bg-red-50" : ""
                  }`}
                >
                  <div>
                    <img
                      src={appointment?.docData?.image}
                      alt="doc-img"
                      className="w-32 bg-indigo-50"
                    />
                  </div>
                  <div className="flex-1 text-sm text-zinc-600">
                    <p className="text-neutral-800 font-semibold">
                      {appointment?.docData?.name}
                    </p>
                    <p>{appointment?.docData?.speciality}</p>
                    <p className="text-zinc-700 font-medium mt-1">Address:</p>
                    <p className="text-xs">
                      {appointment?.docData?.address?.line1}
                    </p>
                    <p className="text-xs">
                      {appointment?.docData?.address?.line2}
                    </p>
                    <p className="text-xs mt-1">
                      <span className="text-sm text-neutral-700 font-medium">
                        Date & Time:{" "}
                      </span>
                      {slotDateFormat(appointment?.slotDate)} |{" "}
                      {appointment?.slotTime}
                    </p>
                  </div>

                  <div></div>

                  <div className="flex flex-col gap-2 justify-end">
                    {!appointment?.cancelled && (
                      <>
                        <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                          Pay Online
                        </button>
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment?._id)
                          }
                          className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          Cancel Appointment
                        </button>
                      </>
                    )}
                    {appointment?.cancelled && (
                      <button className="text-sm bg-red-600 text-white text-center sm:min-w-48 py-2 border hover:bg-red-700 transition-all duration-300 cursor-default">
                        Cancelled
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-36">
              <p className="text-zinc-600">No appointments found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyAppointments;
