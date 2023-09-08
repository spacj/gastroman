import Dashboard from "@/components/Dashboard";
import { successToast } from "@/components/Toast";
import { logOut } from "@/firebaseconfig";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";

const dashboard = () => {
  const router = useRouter();
  const onSignOutHandler = () => {
    logOut();
    deleteCookie("logged");
    successToast("Sign Out Successfully");
    router.push("/home");
  };
  return (
      <div>
          <Dashboard />
      <div className="mr-4 relative">
        <div className="absolute top-2 bottom-0 right-0 z-50">
          <button className="btn bg-orange-600" onClick={onSignOutHandler}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
