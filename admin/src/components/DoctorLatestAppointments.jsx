import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { DoctorContext } from "../context/DoctorContext";

const DoctorLatestAppointments = ({
  appointments,
  handleCancelAppointment,
  handleCompleteAppointment,
}) => {
  const { slotDateFormat } = useContext(AppContext);
  const { fetchDoctorDashboard } = useContext(DoctorContext);

  return (
    <div className="border border-t-0 border-gray-200">
      {appointments?.length > 0 ? (
        appointments?.map((appointment, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-3 gap-3 hover:bg-gray-100 ${
              appointment?.cancelled ? "bg-red-50 hover:bg-red-100/70" : ""
            } ${
              appointment?.isCompleted
                ? "bg-green-50 hover:bg-green-100/70"
                : ""
            }`}
          >
            <img
              src={appointment?.userData?.image}
              alt="doc-img"
              className="overflow-clip-margin-unset object-cover rounded-full size-10"
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">
                {appointment?.userData?.name}
              </p>
              <p className="text-gray-600">
                {slotDateFormat(appointment?.slotDate).concat(
                  " | ",
                  appointment?.slotTime
                )}
              </p>
            </div>
            {appointment?.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : appointment?.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <img
                  src={assets.cancel_icon}
                  alt="cancel"
                  className="w-8 cursor-pointer hover:scale-110 transition-all duration-300"
                  onClick={() => {
                    handleCancelAppointment(appointment?._id).then(() => {
                      fetchDoctorDashboard(); // Refresh appointments after cancellation
                    });
                  }}
                />
                <img
                  src={assets.tick_icon}
                  alt="complete"
                  className="size-8 cursor-pointer hover:scale-110 transition-all duration-300"
                  onClick={() => {
                    handleCompleteAppointment(appointment?._id).then(() => {
                      fetchDoctorDashboard(); // Refresh appointments after cancellation
                    });
                  }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 p-4">No appointments found</p>
      )}
    </div>
  );
};

export default DoctorLatestAppointments;
