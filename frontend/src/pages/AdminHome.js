import React from "react";
import {FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom";


function AdminPage() {
    return ( <div>
        <h1>Welcome Admin</h1>
       
            <div className= "container">

            <div>
                <Link to="/Register">
                    <FaUser /> Register
                </Link>

            </div>
        

            <div>
                <Link to="/Admin">
                    <FaUser /> Admin
                </Link>

            </div>
            <div>
                <Link to="/AddAdminForm">
                    <FaUser /> AddAdminForm
                </Link>

            </div>
            <div>
                <Link to="/RemoveUser">
                    <FaUser /> RemoveUser
                </Link>

            </div>
            <div>
                <Link to="/ViewPatientInfo">
                    <FaUser /> ViewPatientInfo
                </Link>

            </div>
            <div>
                <Link to="/ApproveDoctorRequest">
                    <FaUser /> Approve Doctor Request
             </Link>
           </div>
           <div>
                <Link to="/RejectDoctorRequest">
                    <FaUser /> Reject Doctor Request
             </Link>
           </div>
           <div>
           <Link to="/CreateHealthPackage">
           <FaUser /> Admin Create HP
           </Link>
           </div>
         <div>
        <Link to="/UpdateHealthPackage">
          <FaUser /> Admin Update HP
        </Link>
      </div>
      <div>
        <Link to="/DeleteHealthPackage">
          <FaUser /> Admin Delete HP
        </Link>
      </div>
   
        <div>
                <Link to="/ViewHealthPackages">
                    <FaUser /> View Health Packages
                </Link>
            </div>

            <br />
            <hr/>
            
      <Link to="/change-password">
        <button>Change Password</button>
      </Link>
      </div>
      


        </div>);
}

export default AdminPage;