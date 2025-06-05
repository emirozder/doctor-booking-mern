import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specialityData } from "../assets/assets";
import DoctorCard from "../components/DoctorCard";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    filterDoctors();
  }, [doctors, speciality]);

  const filterDoctors = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((doctor) =>
          doctor.speciality.toLowerCase().includes(speciality.toLowerCase())
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className={`py-1 px-3 border border-gray-200 rounded text-sm transition-all sm:hidden cursor-pointer ${
            showFilter ? "bg-primary text-white" : ""
          }`}
        >
          Filters
        </button>
        <div
          className={`w-full sm:w-auto flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialityData.map((item, index) => (
            <p
              key={index}
              onClick={() =>
                speciality === item.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item.speciality}`)
              }
              className={`flex-1 sm:flex-none sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-sm transition-all cursor-pointer ${
                speciality === item.speciality ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {item.speciality}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
