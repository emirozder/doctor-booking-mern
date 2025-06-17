import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const LatestAppointments = ({ appointments, handleCancelAppointment }) => {
  const { slotDateFormat } = useContext(AppContext);

  return (
    <div className="border border-t-0 border-gray-200">
      {appointments?.length > 0 ? (
        appointments?.map((appointment, index) => (
          <div
            key={index}
            className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
          >
            <img
              src={appointment?.docData?.image}
              alt="doc-img"
              className="rounded-full w-10"
            />
            <div className="flex-1 text-sm">
              <p className="text-gray-800 font-medium">
                {appointment?.docData?.name}
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
            ) : (
              <img
                src={assets.cancel_icon}
                alt="cancel"
                className="w-8 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => handleCancelAppointment(appointment?._id)}
              />
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 p-4">No appointments found</p>
      )}
    </div>
  );
};

export default LatestAppointments;
