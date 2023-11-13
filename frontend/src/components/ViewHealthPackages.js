import React, { useState, useEffect } from 'react';

const ViewHealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/patient/viewHealthPackage');
        const data = await response.json();
        setHealthPackages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health packages:', error);
        setLoading(false);
      }
    };

    fetchHealthPackages();
  }, []);

  return (
    <div className="container">
    <h2>Health Packages</h2>
    {loading && <p>Loading health packages...</p>}
    {!loading && healthPackages.length > 0 && (
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Doctor Session Discount</th>
            <th>Medicine Discount</th>
            <th>Family Subscription Discount</th>
          </tr>
        </thead>
        <tbody>
          {healthPackages.map((healthPackage, index) => (
            <tr key={index}>
              <td>{healthPackage.type}</td>
              <td>{healthPackage.price}</td>
              <td>{healthPackage.doctorSessionDiscount}</td>
              <td>{healthPackage.medicineDiscount}</td>
              <td>{healthPackage.familySubscriptionDiscount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {!loading && healthPackages.length === 0 && <p>No health packages available.</p>}
  </div>
);
};

export default ViewHealthPackages;
