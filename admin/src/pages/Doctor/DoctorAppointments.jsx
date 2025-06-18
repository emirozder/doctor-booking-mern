import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
  const { doctorToken, appointments, appointmentsLoading, fetchAppointments } =
    useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  useEffect(() => {
    if (doctorToken) {
      fetchAppointments();
    }
  }, [doctorToken]);

  return (
    <div className="p-5 h-[calc(100vh-77px)] overflow-y-auto w-full relative">
      <h1 className="text-lg font-medium">All Appointments</h1>
      {appointmentsLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={assets.loading_icon}
            alt="loading"
            className="animate-spin size-8"
          />
        </div>
      ) : (
        /*max-h-[80vh] min-h-[60vh] overflow-y-scroll*/
        <div className="bg-white border border-stone-200 rounded text-sm ">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-stone-200">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Payment</p>
            <p className="text-center">Action</p>
          </div>

          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className={`flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-stone-200 hover:bg-gray-50 transition-all duration-300 ${
                  appointment?.cancelled ? "bg-red-50 hover:bg-red-100/70" : ""
                } ${
                  appointment?.isCompleted
                    ? "bg-green-50 hover:bg-green-100/70"
                    : ""
                }`}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    src={appointment?.userData?.image}
                    alt="user-img"
                    className="size-8 rounded-full"
                  />
                  <p>{appointment?.userData?.name}</p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(appointment?.userData?.dob)}
                </p>
                <p>
                  {slotDateFormat(appointment?.slotDate).concat(
                    " | ",
                    appointment?.slotTime
                  )}
                </p>
                <p>{currencySymbol + appointment?.amount}</p>
                {appointment?.payment ? (
                  <p className="text-green-500 text-xs font-medium">Paid</p>
                ) : (
                  <p className="text-red-400 text-xs font-medium">Not Paid</p>
                )}
                {appointment?.cancelled ? (
                  <p className="text-red-400 text-xs font-medium text-center">
                    Cancelled
                  </p>
                ) : appointment?.isCompleted ? (
                  <p className="text-green-400 text-xs font-medium text-center">
                    Completed
                  </p>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={assets.cancel_icon}
                      alt="cancel"
                      className="size-8 cursor-pointer hover:scale-110 transition-all duration-300"
                      // onClick={() => handleCancelAppointment(appointment?._id)}
                    />
                    <img
                      src={assets.tick_icon}
                      alt="cancel"
                      className="size-8 cursor-pointer hover:scale-110 transition-all duration-300"
                      // onClick={() => handleCancelAppointment(appointment?._id)}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No appointments found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
