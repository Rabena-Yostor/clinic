import React from "react";
import {FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom";

function PatientHome(){

    return ( 
        <div>
            <h1>Welcome Patient</h1>
            <div>
        <Link to="/SubscribeToHealthPackage">
          <FaUser /> Subscribe to Health Package
        </Link>
      </div>
      <div>
        <Link to="/SubscribedHealthPackages">
          <FaUser /> The Subscribed Health Package
        </Link>
      </div>
      <div>
        <Link to="/SubscriptionStatus">
          <FaUser /> Subscription Status
        </Link>
      </div>
      <div>
        <Link to="/cancelSubscription">
          <FaUser /> Cancel Subscription 
        </Link>
      </div>
      <div>
        <Link to="/wallet-info">
          <FaUser /> View Wallet Amount 
        </Link>
      </div>
      <div>
        <Link to="/view-patient-records">
          <FaUser /> View Health record
        </Link>
      </div>
      <div>
        <Link to="/patientPeter">
          <FaUser /> View Appointment
        </Link>
      </div>
      <div>
        <Link to="/patientDocuments">
          <FaUser /> Document Management 
        </Link>
      </div>

      <div>
        <Link to="/hamouda">
          <FaUser />My Prescriptions 
        </Link>
      </div>
            
      <div>
        <Link to="/linkFamilyMember">
          <FaUser />  Link Family Member
        </Link>
      </div>
<div>
        <Link to="/doctors">
          <FaUser /> view all doctors
        </Link>
      </div>
<div>
        <Link to="/patientNotifications">
          <FaUser /> Notifications
        </Link>
      </div>
      <div>
        <Link to="/patientConversation">
          <FaUser /> Conversation
        </Link>
      </div>
      <br />
            <hr/>
            
      <Link to="/change-password">
        <button>Change Password</button>
      </Link>
      
        </div>
    );

}
export default PatientHome;