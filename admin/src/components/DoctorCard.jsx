import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const DoctorCard = ({ doctor }) => {
  const { changeAvailability } = useContext(AdminContext);
  return (
    <div className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="bg-indigo-50 w-full group-hover:bg-primary transition-all duration-500"
      />
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
