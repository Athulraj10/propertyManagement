// src/pages/LeadList.js
import React, { useState, useEffect } from "react";
import Lead from "../Lead/Lead";
import MainLayout from "../../MainLayout";
import { useDispatch } from "react-redux";
import {
  addLead,
  deleteLead,
  editLead,
  getLead,
  getProperty,
} from "../../../../../redux/actions";

const LeadList = () => {
  const dispatch = useDispatch();
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [newLead, setnewLead] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    propertyCardId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    property: "",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(
      getLead({
        callback: (data) => {
          setLeads(data?.data);
        },
      })
    );
    dispatch(
      getProperty({
        isAdmin: true,
        callback: (data) => {
          setProperties(data.data);
        },
      })
    );

    setLoading(false);
  }, [newLead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", property: "" };
    let isValid = true;

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    // Validate Property Selection
    if (!formData.propertyCardId) {
      newErrors.property = "Please select a property.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        addLead({
          data: formData,
          callback: (data) => {
            setnewLead(data);
            setFormData({
              name: "",
              email: "",
              propertyCardId: "",
            });
          },
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(
      deleteLead({
        data: id,
        callback: (data) => {
          if (data) {
            setLeads(leads.filter((lead) => lead._id !== id));
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
      editLead({
        data: data,
        callback: (data) => {
          if (data) {
            setnewLead(data);
          }
        },
      })
    );
  };

  return (
    <>
      <MainLayout />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Leads (Customer){" "}
        </h1>
        <form className="mb-8" onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="username"
              value={formData.name}
              onChange={handleInputChange}
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="propertyCardId"
            >
              Property
            </label>
            <select
              name="propertyCardId"
              value={formData.propertyCardId}
              onChange={handleInputChange}
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a property</option>
              {properties?.map((property) => (
                <option className="text-white" key={property._id} value={property._id}>
                  {property.community} - {property.building} - {property.unitNo}
                </option>
              ))}
            </select>
            {errors.property && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.property}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Lead
          </button>
        </form>
        {leads && leads !== undefined ? (
          <div className="flex flex-wrap">
            {leads?.map((lead) => (
              <Lead
                key={lead._id}
                lead={lead}
                onDelete={handleDelete}
                onEdit={onEdit}
                properties={properties}
              />
            ))}
          </div>
        ):(
          <p>Lead Not Added</p>
        )}
      </div>
    </>
  );
};

export default LeadList;
