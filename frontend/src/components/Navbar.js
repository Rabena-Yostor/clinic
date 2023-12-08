import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios using npm install axios

const Navbar = () => {
  const handleLogout = async () => {
    try {
      // Make a GET request to your logout API endpoint
      const response = await axios.get('/api/doctors/logout');

      // Handle the response as needed, e.g., redirect or perform additional actions
      console.log(response.data); // You can customize this based on your API response
      alert('Logout successful!');
      window.localStorage.removeItem("username")
      // Redirect to the home page or another route after successful logout
      // You can use the useHistory hook from react-router-dom for this
      // import { useHistory } from 'react-router-dom';
      // const history = useHistory();
      // history.push('/');

    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Logout failed', error);
    }
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Rabena Yostor Clinic</h1>
        </Link>
        <Link to="/">
        <button className="btn btn-primary" onClick={handleLogout}>
          Log Out
        </button>
          </Link>
        
      </div>
    </header>
  );
};

export default Navbar;
