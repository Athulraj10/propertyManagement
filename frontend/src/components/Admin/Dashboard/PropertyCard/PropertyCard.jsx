import React, { useEffect, useState } from "react";
import { getLocalStorageItem } from "../../../../utils/helper";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const PropertyCard = ({ property, onDelete, onEdit, onDeleteLead }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperty, setEditedProperty] = useState({
    community: property.community,
    building: property.building,
    unitNo: property.unitNo,
  });

  const handleEditSubmit = () => {
    onEdit(property._id, editedProperty);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProperty({ ...editedProperty, [name]: value });
  };

  const handleLeadDelete = (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      onDeleteLead(property._id, leadId);
    }
  };

  useEffect(() => {
    let localstorage = getLocalStorageItem("adminData");
    if (!localstorage) {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);

  return (
    <>
      <div className="max-w-sm overflow-hidden shadow-lg bg-white p-4 m-4 border rounded-xl w-[400px]">
        {!isEditing ? (
          <>
            <div className="font-bold text-xl mb-2 ">{property.community}</div>
            <p className="text-gray-700 text-base">
              Building: {property.building}
            </p>
            <p className="text-gray-700 text-base">
              Unit No: {property.unitNo}
            </p>

            <div className="mt-4">
              <div className="font-bold text-lg mb-2">Leads:</div>
              {property.leads.map((lead) => (
                <div key={lead._id} className="mb-2 border rounded-lg p-2 flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 text-base">Name: {lead.name}</p>
                    <p className="text-gray-700 text-base">Email: {lead.email}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleLeadDelete(lead._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => onDelete(property._id)}
              >
                Delete Property
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit Property
              </button>
            </div>
          </>
        ) : (
          <>
            <select
              name="community"
              value={editedProperty.community}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
               <option disabled>
               {property.community}: {property.building} : {property.unitNo}
                </option>
              <option value="CommunityA">CommunityA</option>
              <option value="CommunityB">CommunityB</option>
            </select>

            <select
              name="building"
              value={editedProperty.building}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="BuildingA">BuildingA</option>
              <option value="BuildingB">BuildingB</option>
            </select>
            <input
              type="text"
              name="unitNo"
              value={editedProperty.unitNo}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 mt-2 mb-2 w-full"
              placeholder="Unit No"
              required
            />
            <div className="flex mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PropertyCard;
