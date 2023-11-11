import React, { useState } from 'react';

const UpdateHealthPackage = () => {
  const [formData, setFormData] = useState({
    healthPackageId: '',
    price: 0,
    doctorSessionDiscount: 0,
    medicineDiscount: 0,
    familySubscriptionDiscount: 0
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/admin/updateHP', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setResponse('Health package updated successfully!');
      } else {
        setResponse(`Error updating health package: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating health package:', error);
      setResponse('Internal Server Error');
    }
  };

  return (
    <div className="container">
      <h2>Update Health Package</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for health package properties */}
        <div className="form-group">
          <label htmlFor="healthPackageId">Health Package ID:</label>
          <input type="text" id="healthPackageId" name="healthPackageId" value={formData.healthPackageId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" />
        </div>
        <div className="form-group">
          <label htmlFor="doctorSessionDiscount">Doctor Session Discount:</label>
          <input type="number" id="doctorSessionDiscount" name="doctorSessionDiscount" value={formData.doctorSessionDiscount} onChange={handleChange} required min="0" />
        </div>
        <div className="form-group">
          <label htmlFor="medicineDiscount">Medicine Discount:</label>
          <input type="number" id="medicineDiscount" name="medicineDiscount" value={formData.medicineDiscount} onChange={handleChange} required min="0" />
        </div>
        <div className="form-group">
          <label htmlFor="familySubscriptionDiscount">Family Subscription Discount:</label>
          <input type="number" id="familySubscriptionDiscount" name="familySubscriptionDiscount" value={formData.familySubscriptionDiscount} onChange={handleChange} required min="0" />
        </div>
        <button type="submit">Update Health Package</button>
      </form>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
};

export default UpdateHealthPackage;
