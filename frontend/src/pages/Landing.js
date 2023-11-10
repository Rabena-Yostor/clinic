import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Clinic</h1>
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
      <Link to="/patientDocuments">
        <button>Patient Documents</button>
      </Link>
    </div>
  );
}

export default HomePage;
