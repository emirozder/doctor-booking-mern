import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import DashboardCard from "../../components/DashboardCard";
import DoctorLatestAppointments from "../../components/DoctorLatestAppointments";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
  const {
    doctorToken,
    fetchDoctorDashboard,
    doctorDashboardData,
    doctorDashboardDataLoading,
    handleCancelAppointment,
    handleCompleteAppointment,
    dashboardItems,
  } = useContext(DoctorContext);

  // Fetch doctor dashboard data when the component mounts
  useEffect(() => {
    if (doctorToken) {
      fetchDoctorDashboard();
    }
  }, [doctorToken]);

  return (
    <div className="p-5 h-[calc(100vh-77px)] overflow-y-auto w-full relative">
      <h1 className="text-lg font-medium">Dashboard</h1>
      {doctorDashboardDataLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={assets.loading_icon}
            alt="loading"
            className="animate-spin size-8"
          />
        </div>
      ) : (
        <div className="m-5">
          <div className="flex flex-wrap gap-3">
            {dashboardItems.map((item, index) => (
              <DashboardCard key={index} data={item} />
            ))}
          </div>

          <div className="bg-white">
            <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border border-gray-200">
              <img src={assets.list_icon} alt="list-icon" />
              <p className="font-semibold">Latest Appointments</p>
            </div>

            <DoctorLatestAppointments
              appointments={doctorDashboardData?.latestAppointments}
              handleCancelAppointment={handleCancelAppointment}
              handleCompleteAppointment={handleCompleteAppointment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
