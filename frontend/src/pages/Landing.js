import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const userType = localStorage.getItem('userType');
  const username = localStorage.getItem('username');
  // Change userType to the correct user type
  var type = "";
  if (userType === "admin") {
    type = "Admin";
  } else if (userType === "doctor") {
    type = "Doctor";
  } else {
    type = "";
  }
  return (
    <div>
      <h1>Welcome to the Clinic</h1>
      <h2>{type} {username}</h2>
      <br />
      <hr />
      <Link to="/patients">
        <button>View All Patients</button>
      </Link>
      <Link to="/doctors">
        <button>View All Doctors</button>
      </Link>
      <Link to="/malak">
        <button>Malak Branch Test</button>
      </Link>
      <Link to="/khaled">
        <button>Doctor Update/Edit stuff</button>
      </Link>
      <Link to="/hamouda">
        <button>Prescription</button>
      </Link>
      <Link to="/safina">
        <button>Family Member</button>
      </Link>
      <Link to="/hana">
        <button>filterAppointment&viewInfo</button>
      </Link>
      <Link to="/view-health-records">
        <button>View Health Records</button>
      </Link>
      <Link to="/view-patient-records">
        <button>View patient record</button>
      </Link>
      <Link to="/wallet-info">
        <button>View wallet amount</button>
      </Link>
      <br />
      <hr />
      <br />
      <Link to="/change-password">
        <button>Change Password</button>
      </Link>


    </div>
  );
}

export default HomePage;
