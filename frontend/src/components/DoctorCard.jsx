import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/appointment/${doctor._id}`)}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <img src={doctor.image} alt={doctor.name} className="bg-blue-50" />
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center text-green-500">
          <p className="size-2 rounded-full bg-green-500" />
          <p>Available</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
