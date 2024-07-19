import React, { useState, useEffect } from 'react';

const Lead = ({ lead, onDelete, onEdit, properties }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    propertyCardId: lead?.propertyCardId || ""
  });
  const [originalData, setOriginalData] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    propertyCardId: lead?.propertyCardId || ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (isEditing) {
      setOriginalData({
        name: lead?.name || "",
        email: lead?.email || "",
        propertyCardId: lead?.propertyCardId || ""
      });
      setEditFormData({
        name: lead?.name || "",
        email: lead?.email || "",
        propertyCardId: lead?.propertyCardId || ""
      });
    }
  }, [isEditing, lead]);

  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let isValid = true;

    if (!editFormData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(editFormData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
      isValid = false;
    }

    if (!editFormData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editFormData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onEdit(lead?._id, editFormData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editFormData.name}
              onChange={handleInputChange}
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyCardId">
              Property
            </label>
            <select
              name="propertyCardId"
              value={editFormData.propertyCardId}
              onChange={handleInputChange}
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value={editFormData.propertyCardId} disabled>Current Property: {lead?.property?.community}, {lead?.property?.building}, {lead?.property?.unitNo}</option>
              {properties?.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.community} - {property.building} - {property.unitNo}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="font-bold text-xl mb-2">{lead?.name}</div>
          <p className="text-gray-700 text-base">Email: {lead?.email}</p>
          <p className="text-gray-700 text-base">
            Property: {lead?.property?.community}, {lead?.property?.building}, {lead?.property?.unitNo}
          </p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => onDelete(lead?._id)}
          >
            Delete
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Lead;
