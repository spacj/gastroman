import MenuCreate from "@/components/MenuCreate";
import Sidebar from "@/components/SideBar";
import React from "react";

const MenuPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MenuCreate />
    </div>
  );
};

export default MenuPage;
