// src/pages/PropertyList.js
import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import MainLayout from "../MainLayout";
import { useDispatch } from "react-redux";
import {
  addProperty,
  deleteProperty,
  editProperty,
  getLead,
  getProperty,
} from "../../../../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "../../../../utils/helper";

const PropertyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dashboard = location.pathname.includes("/dashboard");
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [newProperties, setNewProperties] = useState([]);
  const [formData, setFormData] = useState({
    community: "CommunityA",
    building: "BuildingA",
    unitNo: "",
  });

  useEffect(() => {
    dispatch(
      getProperty({
        isAdmin: true,
        callback: (data) => {
          setProperties(data.data);
        },
      })
    );
    dispatch(
      getLead({
        callback: (data) => {
          setLeads(data?.data);
        },
      })
    );
  }, [newProperties]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(
      addProperty({
        data: formData,
        callback: (data) => {
          setNewProperties(new Date());
        },
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(
      deleteProperty({
        data: {
          lead: false,
          id,
        },
        callback: (data) => {
          if (data) {
            setProperties(properties.filter((property) => property._id !== id));
          }
        },
      })
    );
  };
  const handleLeadDelete = (propertyId, leadId) => {
    dispatch(
      deleteProperty({
        data: {
          lead: true,
          propertyId,
          leadId,
        },
        callback: (data) => {
          if (data) {
            setNewProperties(new Date());
          }
        },
      })
    );
  };
  const onEdit = (id, editedProperty) => {
    const data = {
      id,
      editedProperty,
    };
    dispatch(
      editProperty({
        data: data,
        callback: (data) => {
          if (data) {
            setNewProperties(new Date());
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
      <MainLayout />
      <div className="container mx-auto p-4">
        <h1 className="text-white text-2xl font-bold mb-4">Property Cards</h1>
        {!dashboard && (
          <form className="mb-8" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="community"
              >
                Community
              </label>
              <select
                name="community"
                value={formData.community}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="CommunityA">CommunityA</option>
                <option value="CommunityB">CommunityB</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="building"
              >
                Building
              </label>
              <select
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="BuildingA">BuildingA</option>
                <option value="BuildingB">BuildingB</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="unitNo"
              >
                Unit No
              </label>
              <input
                type="text"
                name="unitNo"
                value={formData.unitNo}
                onChange={handleInputChange}
                className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="lead"
              >
                Lead
              </label>
              <select
                name="lead"
                value={formData.propertyCardId}
                onChange={handleInputChange}
                className="text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Select a Lead" disabled>
                  Select a Lead
                </option>
                {leads?.map((lead) => (
                  <option key={lead._id} value={lead._id}>
                    {lead.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Property
            </button>
          </form>
        )}

        <div className="flex flex-wrap">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
              onDeleteLead={handleLeadDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyList;
