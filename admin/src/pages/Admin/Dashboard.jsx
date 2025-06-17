import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import DashboardCard from "../../components/DashboardCard";
import LatestAppointments from "../../components/LatestAppointments";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const {
    adminToken,
    fetchAdminDashboardData,
    adminDashboardData,
    adminDashboardDataLoading,
    handleCancelAppointment,
    dashboardItems,
  } = useContext(AdminContext);

  useEffect(() => {
    if (adminToken) fetchAdminDashboardData();
  }, [adminToken]);

  return (
    <div className="p-5 h-[calc(100vh-77px)] overflow-y-auto w-full relative">
      <h1 className="text-lg font-medium">Dashboard</h1>
      {adminDashboardDataLoading ? (
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

            <LatestAppointments
              appointments={adminDashboardData?.latestAppointments}
              handleCancelAppointment={handleCancelAppointment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
