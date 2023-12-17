import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/doctors/logout');
      console.log(response.data);
      alert('Logout successful!');
      // Redirect to the home page or another route after successful logout
       navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <header>
      <div className="content">
        <Link to="/">
          <h1>Rabena Yostor Clinic</h1>
        </Link>
        <button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn btn-secondary" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </header>
  );
};

export default Navbar;
