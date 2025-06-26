import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const DoctorCard = ({ doctor }) => {
  const { changeAvailability } = useContext(AdminContext);
  return (
    <div className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group">
      <div className="group-hover:bg-primary transition-all duration-500">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="overflow-clip-margin-unset h-64 mx-auto object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={doctor.available}
            onChange={() => changeAvailability(doctor._id)}
          />
          <p>Available</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
