import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/actions";
import { getLocalStorageItem } from "../../../utils/helper";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAdminRoute = location.pathname.includes("/admin/");

  const handleLogout = () => {
    let data = {
      id: null,
      admin: null,
    };
    if (isAdminRoute) {
      let localstorage = getLocalStorageItem("adminData");
      data.admin = true;
      data.id = localstorage;
    } else {
      let localstorage = getLocalStorageItem("userData");
      data.admin = false;
      data.id = localstorage;
    }
    dispatch(
      logOut({
        data: data,
        callback: (data) => {
          if (data.meta.code === 200) {
            navigate("/admin/login");
            return;
          }
        },
      })
    );
  };
  useEffect(() => {
    let localstorage = getLocalStorageItem("adminData");
    if (!localstorage) {
      navigate("/admin/login");
      return;
    }
  });

  return (
    <>
      <nav className="bg-dark border dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Property Management
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <Link
                  to="/admin/properties"
                  className="block py-2 px-3 text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  properties
                </Link>
               <Link
                  to="/admin/leads"
                  className="block text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Leads
                </Link>
              <li className="bg-dark-700">
                <p
                  onClick={() => handleLogout()}
                  className="block  cursor-pointer py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainLayout;
