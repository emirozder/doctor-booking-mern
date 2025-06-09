import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import DoctorCard from "../../components/DoctorCard";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { adminToken, doctors, doctorsLoading, fetchDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      fetchDoctors();
    }
  }, [adminToken]);

  return (
    <div className="p-5 h-[calc(100vh-77px)] overflow-y-auto w-full relative">
      <h1 className="text-lg font-medium">All Doctors</h1>
      {doctorsLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={assets.loading_icon}
            alt="loading"
            className="animate-spin size-8"
          />
        </div>
      ) : (
        <div className="w-full pt-5 grid grid-cols-auto gap-4 gap-y-6">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              No doctors found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
