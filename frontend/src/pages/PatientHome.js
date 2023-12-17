import React from "react";
import { Link } from "react-router-dom";

function PatientHome() {
  return (
    <div className="container">
      <h1 className="main-title">Welcome Patient</h1>
      <div className="links-container">
        {[
          { to: "/SubscribeToHealthPackage", text: "Subscribe to Health Package" },
          { to: "/SubscribedHealthPackages", text: "The Subscribed Health Package" },
          { to: "/ViewHealthPackages", text: "View Health Packages" },
          { to: "/SubscriptionStatus", text: "Subscription Status" },
          { to: "/CancelSubscription", text: "Cancel Subscription" },
          { to: "/AddHealthRecord", text: "Add Health Record" },
          { to: "/view-health-records", text: "View Health Record" },
          { to: "/wallet-page", text: "View Wallet Amount" },
          { to: "/patientPeter", text: "Patient Appointments" },
          { to: "/patientNotifications", text: "Notifications" },
          { to: "/patientConversation", text: "Conversation" },
          { to: "/patientDocuments", text: "Documents" },
          { to: "/addPrescription", text: "Add Prescription" },
          { to: "/hamouda", text: "View Prescription" },
        
          { to: "/linkFamilyMember", text: "Link Family Member" },
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

export default PatientHome;
