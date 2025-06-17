import React from "react";

const DashboardCard = ({ data }) => {
  return (
    <div className="flex items-center gap-2 bg-white p-4 min-w-60 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
      <img src={data.img} alt={data.name} className="size-14" />
      <div>
        <p className="text-xl font-semibold text-gray-600">{data.count}</p>
        <p className="text-gray-400">{data.name}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
