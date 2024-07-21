import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="">
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};
export default AppLayout;
