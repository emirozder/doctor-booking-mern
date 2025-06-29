import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor?._id}`);
        scrollTo(0, 0);
      }}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <div className="bg-blue-50">
        <img
          src={doctor?.image}
          alt={doctor?.name}
          className="overflow-clip-margin-unset h-64 mx-auto object-cover"
        />
      </div>
      <div className="p-4">
        <div
          className={`flex items-center gap-2 text-sm text-center ${
            doctor?.available ? "text-green-500" : "text-red-500"
          }`}
        >
          <p
            className={`size-2 rounded-full ${
              doctor?.available ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <p>{doctor?.available ? "Available" : "Not Available"}</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor?.name}</p>
        <p className="text-gray-600 text-sm">{doctor?.speciality}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
