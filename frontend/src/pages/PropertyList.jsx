// src/pages/PropertyList.js
import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    community: 'CommunityA',
    building: 'BuildingA',
    unitNo: ''
  });

  useEffect(() => {
    fetch('/api/property-cards')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add property card to the API
    fetch('/api/property-cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newProperty => setProperties([...properties, newProperty]))
      .catch(error => console.error('Error adding property:', error));
  };

  const handleDelete = (id) => {
    // Delete property card from the API
    fetch(`/api/property-cards/${id}`, { method: 'DELETE' })
      .then(() => setProperties(properties.filter(property => property._id !== id)))
      .catch(error => console.error('Error deleting property:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Cards</h1>
      <form className="mb-8" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="community">
            Community
          </label>
          <select
            name="community"
            value={formData.community}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="CommunityA">CommunityA</option>
            <option value="CommunityB">CommunityB</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="building">
            Building
          </label>
          <select
            name="building"
            value={formData.building}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="BuildingA">BuildingA</option>
            <option value="BuildingB">BuildingB</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitNo">
            Unit No
          </label>
          <input
            type="text"
            name="unitNo"
            value={formData.unitNo}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Property
        </button>
      </form>
      <div className="flex flex-wrap">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
