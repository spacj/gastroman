import BusinessInfo from "@/components/BusinessInfo";
import Sidebar from "@/components/SideBar";
import React from "react";

const InfoBusiness = () => {
  return (
    <div className="flex gap-5 md:gap-24">
      <Sidebar />
      <BusinessInfo />
    </div>
  );
};

export default InfoBusiness;
