import {FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'




const Header = () => {
    return (
        <header>
            <div className= "container">

            </div>

            <div>
                <Link to="/Register">
                    <FaUser /> Register
                </Link>

            </div>
            <div>
                <Link to="/SubmitRequest">
                    <FaUser /> SubmitRequest
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
            
        </header>
    )
}

export default Header;



