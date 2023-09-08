import PersonalInfo from "@/components/PersonalInfo";
import Sidebar from "@/components/SideBar";
import React from "react";

const InfoPersonal = () => {
  return (
    <div className="flex gap-5 md:gap-24">
      <Sidebar />
      <PersonalInfo />
    </div>
  );
};

export default InfoPersonal;
