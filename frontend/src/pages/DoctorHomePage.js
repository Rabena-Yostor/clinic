import React from "react";
import { FaUser } from 'react-icons/fa'
import { Link } from "react-router-dom";

function DoctorPage() {

    const handleAddHealthRecord = () => {
        // Implement logic to handle updates after adding a health record
        console.log('Health record added. Update state or perform other actions.');
    };
    return (
        <div className="container">
        <h1 className="main-title">Welcome Doctor</h1>
        <div className="links-container">
         {[
            {to:"/addHealthRecord", text:"Add Health Record"},
            {to:"/view-health-records", text:"View Health Record"},
            {to:"/wallet-doc", text:"View Wallet Amount"},
            {to:"/doctorPeter", text:"Doctor Appointments"},
            {to:"/doctorNotifications", text:"Notifications"},
            {to:"/doctorConversation", text:"Conversation"},
            {to:"/addPrescription", text:"Add Prescription"},
            {to:"/doctorPrescription", text:"View My Patients' Prescription"},
            {to:"/doctorForm", text:"Add DoctorForm"},
            {to:"/DoctorUpdateEdit", text:"Doctor Update Edit"},
           
            {to:"/doctorFollowUpRequests", text:"Follow-Up Requests"},
            {to:"/VideoCallComponent", text:"Start a video call"},
            {to:"/patients", text:"View Patients"},
           
            {to:"/viewcontract", text:"View Contract"},

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

export default DoctorPage;