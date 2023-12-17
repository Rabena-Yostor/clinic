import React from "react";
import {FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom";


function AdminPage() {
  return (
    <div className="container">
    <h1 className="main-title">Welcome Admin</h1>
    <div className="links-container">
     {[
        
        {to:"/Admin", text:"Pending Doctor Requests"},
        {to:"/AddAdminForm", text:"Add Admin Form"},
        {to:"/RemoveUser", text:"Remove User"},
        {to:"/ViewPatientInfo", text:"View Patient Info"},
        {to:"/ApproveDoctorRequest", text:"Approve Doctor Request"},
        {to:"/RejectDoctorRequest", text:"Reject Doctor Request"},
        {to:"/CreateHealthPackage", text:"Create Health Package"},
        {to:"/UpdateHealthPackage", text:"Update Health Package"},
        {to:"/DeleteHealthPackage", text:"Delete Health Package"},
        {to:"/ViewHealthPackages", text:"View Health Packages"},

       ].map((link, index) => (
        <Link key={index} className="link-button" to={link.to}>
          {link.text}
        </Link>
      ))}
    </div>
    <Link to="/change-password" className="link-button link-button-primary">
      Change Password
    </Link>
  </div>
);
}

export default AdminPage;