import About from "@/components/About";
import Sidebar from "@/components/SideBar";
import React from "react";

const AboutPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <About />
    </div>
  );
};

export default AboutPage;
