import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <ToastContainer />
    </>
  );
};
export default AppLayout;
