import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProperty } from "../redux/actions";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin/");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    dispatch(
      getProperty({
        isAdmin: isAdminRoute,
        callback: (data) => {
          setProperties(data.data);
        },
      })
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full sm:px-0 border-gray-200 dark:bg-gray-900">
        <div className="w-full sm:px-0 h-[80vh]">
          <h1 className="text-3xl font-bold text-center text-white">
            Properties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {properties ? (
              properties?.map((property) => (
                <div
                  key={property._id}
                  className="max-w-sm rounded leading-7 overflow-hidden shadow-lg bg-white p-4 m-4"
                >
                  <div className="font-bold text-xl mb-2 text-black">
                    {property.community}
                  </div>
                  <p className="text-gray-700 text-base text-black">
                    Building: {property.building}
                  </p>
                  <p className="text-gray-700 text-base text-black">
                    Unit No: {property.unitNo}
                  </p>
                </div>
              ))
            ) : (
              <>No Property Listed</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
