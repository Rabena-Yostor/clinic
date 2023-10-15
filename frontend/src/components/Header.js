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

        </header>
    )
}

export default Header;



