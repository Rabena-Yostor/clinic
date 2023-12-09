import React from "react";
import { FaUser } from 'react-icons/fa'
import { Link } from "react-router-dom";

function DoctorPage() {

    const handleAddHealthRecord = () => {
        // Implement logic to handle updates after adding a health record
        console.log('Health record added. Update state or perform other actions.');
    };
    return (
        <div>
            <h1>Welcome Doctor</h1>

            <div>
                <Link to="/AddHealthRecord">
                    <FaUser /> Add Health Record

                </Link>
            </div>
            <div>
                <Link to="/view-health-records">
                    <FaUser /> View Health Record

                </Link>
            </div>
            <div>
                <Link to="/wallet-doc">
                    <FaUser /> view wallet amount
                </Link>
            </div>
            <div>
                <Link to="/doctorNotifications">
                    <FaUser /> Notifications
                </Link>
            </div>

            <div>
                <Link to="/doctorPeter">
                    <FaUser /> DoctorAppointments
                </Link>
            </div>
            <br />
            <hr />

            <Link to="/change-password">
                <button>Change Password</button>
            </Link>

        </div>
    );
}

export default DoctorPage;