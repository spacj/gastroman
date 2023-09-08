import Mission from "@/components/Mission";
import Sidebar from "@/components/SideBar";
import React from "react";

const MissionPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Mission />
    </div>
  );
};

export default MissionPage;
